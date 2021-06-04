import express from "express";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const rawDirName = join(__filename, "../");
const __dirname = dirname(rawDirName);
export var router = express.Router();

var users = [];
var isAuth = false;

// dummy auth
let auth = (req, res, next) => {
  switch (req.path) {
    case "/login":
      for (const user of users) {
        if (user.email === req.body.email) {
          bcrypt.compare(
            req.body.password,
            user.password,
            function (err, result) {
              if (result) {
                isAuth = true;
              }
            }
          );
        }
      }
      break;
    case "/register":
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          users.push({
            email: req.body.email,
            password: hash,
          });
          fs.promises.writeFile(
            __dirname + "/db/users.json",
            JSON.stringify({
              email: req.body.email,
              password: hash,
            })
          );
        });
      });

      break;
    default:
      break;
  }
  next();
};

// index route
router
  .get("/", (req, res) => {
    res
      .header("Content-Type", "text/html")
      .status(200)
      .sendFile(__dirname + "/pages/index.html");
  })
  .post("/", (req, res) => {
    res.json({
      error: "bad request",
    });
  });

// register route
router
  .get("/register", (req, res) => {
    res.send("send post request here pls");
  })
  .post("/register", auth, (req, res) => {
    res.redirect("/home");
  });

// login route
router
  .get("/login", (req, res) => {
    res.send("send post request here pls");
  })
  .post("/login", auth, (req, res) => {
    res.redirect("/home");
  });

// display users
router.get("/users", (req, res) => {
  res.json(users);
});

// home route
router
  .get("/home", (req, res) => {
    if (isAuth) {
      res
        .header("Content-Type", "text/html")
        .status(200)
        .sendFile(__dirname + "/pages/home.html");
    } else {
      res.send("pls log in");
    }
  })
  .post("/home", (req, res) => {
    res.send("post in home");
  });
