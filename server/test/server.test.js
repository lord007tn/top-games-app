require("dotenv").config();
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");

describe("Server", () => {
    it("should succeed", async () => {
        const res = await request(app).get("/");

        expect(res.status).to.equal(200);
        expect(res.body).to.equal("Hello World");
    });
});
describe("/GET top_games_by_playtime", () => {
    it("should return 3 top games by playtime and 200 status", async () => {
        const res = await request(app).get("/games/playtime");

        expect(res.status).to.equal(200);
        expect(res.body.games).to.have.length(3);
    });
    it("should success when genre is passed", async () => {
        const res = await request(app).get("/games/playtime?genre=MMORPG");

        expect(res.status).to.equal(200);
        expect(res.body.games).to.have.length(1);
    });
    it("should success when platform is passed", async () => {
        const res = await request(app).get("/games/playtime?platform=PS4");

        expect(res.status).to.equal(200);
        expect(res.body.games).to.have.length(2);
    });
    it("should success when both platform and genre is passed", async () => {
        const res = await request(app).get("/games/playtime?platform=PC&genre=MMORPG");

        expect(res.status).to.equal(200);
        expect(res.body.games).to.have.length(1);
    });
});
describe("/GET top_games_by_players", () => {
    it("should return 3 top games by players and 200 status", async () => {
        const res = await request(app).get("/games/players");

        expect(res.status).to.equal(200);
        expect(res.body.games).to.have.length(3);
    });
    it("should success when genre is passed", async () => {
        const res = await request(app).get("/games/players?genre=MMORPG");

        expect(res.status).to.equal(200);
        expect(res.body.games).to.have.length(1);
    });
    it("should success when platform is passed", async () => {
        const res = await request(app).get("/games/players?platform=PS4");

        expect(res.status).to.equal(200);
        expect(res.body.games).to.have.length(2);
    });
    it("should success when both platform and genre is passed", async () => {
        const res = await request(app).get("/games/players?platform=PC&genre=MMORPG");

        expect(res.status).to.equal(200);
        expect(res.body.games).to.have.length(1);
    });
});
