require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/Vote");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true,
});

// this means /poll because we set -> app.use('/poll', poll);
router.get("/", (req, res) => {
  Vote.find().then(votes => {
    res.json({success: true,
    votes: votes})
  });
});

router.post("/", (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1,
  };

  new Vote(newVote).save().then((vote) => {
    pusher.trigger("os-poll", "os-vote", {
      points: parseInt(vote.points),
      os: vote.os,
    });

    return res.json({
      success: true,
      message: "Thank you for voting",
    });
  });
});

module.exports = router;
