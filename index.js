const express = require("express"),
  app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movies;
const Users = Models.Users;
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");
const cors = require("cors");
app.use(cors());
const { check, validationResult } = require("express-validator");

// mongoose.connect("mongodb://localhost:27017/cfdb", {
//   useUnifiedTopology: true,
// });

mongoose.connect(process.env.CONNECTION_URI, {
  useUnifiedTopology: true,
});

//READ
//Return a list of ALL movies to the user
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//localhost:8080/users?Username=applejuicer&Password=redapple

//READ
//Return data (description, genre, director, image URL, whether it’s featured or not)
//about a single movie by title to the user
app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ
//Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get("/movies/genres/:Name", async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.Name })
    .then((movies) => {
      res.status(200).json(movies.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err + ". Genre does not exist!");
    });
});

//READ
//Return data about a director (bio, birth year, death year) by name
app.get("/movies/directors/:Name", async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.Name })
    .then((movies) => {
      res.status(200).json(movies.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err + ". Director does not exist!");
    });
});

//CREATE
//Allow new users to register
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],

  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//UPDATE
//Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put(
  "/users/:Username",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //CONDITION ENDS
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    ) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//CREATE
// Add a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID", async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send("Permission denied");
  }
  //CONDITION ENDS
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  ) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//DELETE
//Remove a movie from a user's list of favorites
app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send("Permission denied");
  }
  //CONDITION ENDS
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  ) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Delete a user by username
app.delete("/users/:Username", async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send("Permission denied");
  }
  //CONDITION ENDS
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ
// Get a user by username
app.get("/users/:Username", async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ
//Return a list of ALL users to the user
app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
