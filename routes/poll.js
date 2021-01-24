require('dotenv').config()
const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    useTLS: true
  });

// this means /poll because we set -> app.use('/poll', poll);
router.get('/', (req, res) => {
    res.send('POLL');
});

router.post('/', (req, res) => {
    pusher.trigger("os-poll", "os-vote", {
        points: 1,
        os: req.body.os
      });

      return res.json({success: true, message: 'Thank you for voting'});
});

module.exports = router;