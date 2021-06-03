import express from "express";
export var router = express.Router();

router
  .get("/", (req, res) => {
    res.send("get in home");
  })
  .post("/", (req, res) => {
    res.send("post in home");
  });

router
  .get("/about", (req, res) => {
    res.send("get in about");
  })
  .post("/about", (req, res) => {
    res.send("post in about");
  });
