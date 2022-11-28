const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http:localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// db
const db = require("./app/models");
const dbConfig = require("./app/config/dbConfig");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

/// initiation
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "freelance",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'freelance' to roles collection");
      });

      new Role({
        name: "client",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'client' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

//routes

//wellcome routes
app.get("/", (req, res) => {
  res.json({ message: "Wellcome to umify backend services!" });
});

// user routes
require("./app/routes/authRoutes")(app);
require("./app/routes/userRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
