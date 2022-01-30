// https://gist.github.com/aerrity/fd393e5511106420fba0c9602cc05d35

console.log("Server-side code running");

const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

// serve files from the public directory
app.use(express.static("public"));

// connect to the db and start the express server
let db;
const url = "mongodb://localhost/test";

// getting-started.js - define a connection
MongoClient.connect(url, (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;
  console.log("mongo connect");
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log("listening on: http://localhost:8080/");
  });
});

// serve the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// add a document to the DB collection recording the click event
app.post("/clicked", (req, res) => {
  const click = { clickTime: new Date() };
  //   console.log(click);
  // console.log(db);

  db.collection("clicks").save(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    // console.log("click added to db");
    res.sendStatus(201);
  });
});

// get the click data from the database
// This adds a GET endpoint at http://localhost:8080/clicks which will return an array containing all the documents in the database
app.get("/clicks", (req, res) => {
  db.collection("clicks")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
});

app.delete("/clicked", (req, res) => {
  db.collection("clicks").deleteOne({});
});
