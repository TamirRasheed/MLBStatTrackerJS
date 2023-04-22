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
      const awayScore = game.teams.away.score || 0;
  const homeScore = game.teams.home.score || 0;

    
      return {
        GameID: game.gamePk,
        HomeTeam: game.teams.home.team.name,
        AwayTeam: game.teams.away.team.name,
        HomeTeamRecord: game.teams.home.leagueRecord,
        AwayTeamRecord: game.teams.away.leagueRecord,
        DateTime: game.gameDate,
        Status: game.status.abstractGameState,
        homeScore: homeScore,
        awayScore: awayScore,
        Inning: game.linescore?.currentInningOrdinal || "N/A"
      };
    }
    );
    res.send(gamedata);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving game data');
  }
});

module.exports = router;
