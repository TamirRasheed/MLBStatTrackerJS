const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const response = await axios.get(
      `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${date}&endDate=${date}`
    );
    const gamedata = response.data.dates[0].games.map((game) => {
      return {
        GameID: game.gamePk,
        HomeTeam: game.teams.home.team.name,
        AwayTeam: game.teams.away.team.name,
        HomeTeamRecord: game.teams.home.leagueRecord,
        AwayTeamRecord: game.teams.away.leagueRecord,
        DateTime: game.gameDate,
        Status: game.status.abstractGameState,
        Winner: game.teams.home.score > game.teams.away.score ? game.teams.home.team.name : game.teams.away.team.name,
        Inning: game.linescore?.currentInningOrdinal || "N/A"
      };
    });
    res.send(gamedata);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
