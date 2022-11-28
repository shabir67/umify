const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../config/authConfig");
const db = require("../models");
const User = db.user;
const Role = db.role;

catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isFreelance = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "freelance") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Freelance Role!" });
        return;
      }
    );
  });
};

isClient = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "client") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Client Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  catchError,
  verifyToken,
  isClient,
  isFreelance,
};
module.exports = authJwt;
