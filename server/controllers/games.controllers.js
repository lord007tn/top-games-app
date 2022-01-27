const games = require("../constant/games");
const _ = require("underscore");

module.exports.selectTopByPlaytime = async (req, res) => {
    const genre = req.query.genre ? req.query.genre : null;
    const platform = req.query.platform ? req.query.platform : null;
    let data = games;
    let topGames = [];
    let finalData = [];

    if (genre) {
        data = _.filter(data, (element) => {
            return element.genre === genre;
        });
    }
    if (platform) {
        data = _.filter(data, (element) => {
            return element.platforms.find((elPlatform) => elPlatform === platform);
        });
    }
    topGames = [...new Set(data.map((item) => item.game))];

    topGames.forEach((tGame) => {
        const obj = {
            game: "",
            platforms: [],
            genre: "",
            totalPlayTime: 0,
        };

        data.forEach((element) => {
            if (element.game === tGame) {
                obj.game = element.game;
                obj.platforms = element.platforms;
                obj.genre = element.genre;
                obj.totalPlayTime += element.playTime;
            }
        });
        finalData.push(obj);
    });
    finalData = _.sortBy(finalData, "totalPlayTime").slice(-3).reverse();
    return res.status(200).json({ games: finalData });
};
module.exports.selectTopByPlayers = async (req, res) => {
    const genre = req.query.genre ? req.query.genre : null;
    const platform = req.query.platform ? req.query.platform : null;
    let data = games;
    let topGames = [];
    let finalData = [];

    if (genre) {
        data = _.filter(data, (element) => {
            return element.genre === genre;
        });
    }
    if (platform) {
        data = _.filter(data, (element) => {
            return element.platforms.find((elPlatform) => elPlatform === platform);
        });
    }
    topGames = [...new Set(data.map((item) => item.game))];
    topGames.forEach((tGame) => {
        const obj = {
            game: "",
            platforms: [],
            genre: "",
            totalPlayers: 0,
        };
        let uniquePlayers = [];

        data.forEach((element) => {
            if (element.game === tGame) {
                obj.game = element.game;
                obj.platforms = element.platforms;
                obj.genre = element.genre;
                if (uniquePlayers.indexOf(element.userId) === -1) {
                    obj.totalPlayers += 1;
                    uniquePlayers.push(element.userId);
                }
            }
        });
        finalData.push(obj);
    });
    finalData = _.sortBy(finalData, "totalPlayers").slice(-3).reverse();
    return res.status(200).json({ games: finalData });
};
