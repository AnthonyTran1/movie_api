const express = require("express"),
  morgan = require("morgan"),
  path = require("path");
const app = express();

//movie list
let topMovies = [
  { title: "John Wick" },
  { title: "John Wick 2" },
  { title: "John Wick 3: Parabellum" },
  { title: "John Wick: Chapter 4" },
  { title: "Pokemon The first Movie" },
  { title: "Rush Hour" },
  { title: "Rush Hour 2" },
  { title: "Rush Hour 3" },
  { title: "Harry Potter and the Sorcerer's Stone" },
  { title: "WALLE" },
];

app.use(morgan("common"));
app.use("/public", express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/public"));
//endpoint requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie app!");
});

// app.get("/documentation.html", (req, res) => {
//   res.sendFile("documentation.html", { root: __dirname + "/public" });
// });

app.get("/movies", (req, res) => {
  res.send(topMovies);
});

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! Try again later!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
