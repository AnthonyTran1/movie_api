const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/cfdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Anthony",
    favoriteMovies: [],
  },
  { id: 2, name: "Joe", favoriteMovies: ["The Fountain"] },
];

let movies = [
  {
    Title: "The Fountain",
    Description:
      "as a modern-day scientist, Tommy is struggling with mortality, desperately searching for the medical breakthrough that will save the life of his cancer-stricken wife, Izzi.",
    Genre: {
      Name: "Drama",
      Description:
        "In film and television, drama is a category of narrative fiction (or semi-fiction) intented to be more seriousthan humorous in tone.",
    },
    Director: {
      Name: "Darren Aronofsky",
      Bio: "Darren Aronofsky was born Februrary 12, 1969, in Brooklyn, New York.",
      Birth: 1969,
    },
    ImageURL: "some website",
    Featured: false,
  },
  {
    Title: "Example",
    Description: "Example",
    Genre: {
      Name: "Thriller",
      Description: "Thriller Example.",
    },
    Director: {
      Name: "Example Person",
      Bio: "Person Example.",
      Birth: 1969,
    },
    ImageURL: "some website",
    Featured: false,
  },
];

//CREATE
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Users needs name");
  }
});

//UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

//CREATE
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);
  if (user) {
    user = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

//READ
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//READ
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

//READ
app.get("/movies/genres/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

//READ
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such director");
  }
});

app.listen(8080, () => console.log("listening on 8080"));
