import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const rawDirName = join(__filename, "../");
const __dirname = dirname(rawDirName);
export var router = express.Router();

var isAuth = false;

// dummy auth
let auth = (req, res, next) => {
  isAuth = true;
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

  // login route
router
  .get("/login", (req, res) => {
    res.send("send post request here pls");
  })
  .post("/login", (req, res) => {
    res.send(req.body.email);
  });

  // home route
router
  .get("/home", auth, (req, res) => {
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
