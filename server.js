const express = require("express");
const app = express();
const port = 3000;
const monk = require("monk");
require("dotenv").config();

// Connection URL
const url = process.env.DB_CONNECTION_STRING;

const db = monk(url);

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "pug");

app.set("views", "./views");

app.get("/", async (req, res) => {
  const usersCollection = db.get("users");
  const users = await usersCollection.find();

  res.render("index", {
    title: "Hey",
    message: users.map((x) => x.name).join(", "),
  });
});

app.post("/", async (req, res) => {
  const users = db.get("users");
  const newUser = await users.insert({ name: req.body.name });
  res.json({ newUser });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
