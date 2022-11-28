const db = require("../models");
const Milestone = db.milestone;

exports.create = (req, res) => {
  if (!req.body.milestone) {
    res.status(400).send({ message: "Milestone can not be empty!" });
    return;
  }
  // Create a Milestone
  const milestone = new Milestone({
    milestone: req.body.milestone,
    amount: req.body.amount,
    totalamount: req.body.totalamount,
    flemail: req.body.freelanceEmail,
    custEmail: req.body.custEmail,
    date: req.body.Date,
  });

  // Save Tutorial in the database
  milestone
    .save(milestone)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the milsetone.",
      });
    });
};
