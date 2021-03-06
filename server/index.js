require("dotenv").config();
const app = require("./app");
const http = require("http");
const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port);

server.on("error", (err) => {
    console.error(err);
});

server.on("listening", () => {
    console.log(`Server listening on port ${port}`);
});
