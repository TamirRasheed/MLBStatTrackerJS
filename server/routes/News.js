const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.sportsdata.io/v3/mlb/scores/json/News?key=14a008b03a3e49e7a60907cb9c3f9a23"
    );
    const news = response.data;
    res.send(news);
  } catch (error) {
    console.error(error);
  }
});

router.get("/content", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.sportsdata.io/v3/mlb/scores/json/News?key=14a008b03a3e49e7a60907cb9c3f9a23"
    );
    const content = response.data.map((newsItem) => newsItem.Content);
    res.send(content);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;