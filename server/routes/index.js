const router = require("express").Router();
const { selectTopByPlayers, selectTopByPlaytime } = require("../controllers/games.controllers");

router.get("/playtime", selectTopByPlaytime);
router.get("/players", selectTopByPlayers);
module.exports = router;
