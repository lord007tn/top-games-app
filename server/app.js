const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

// configuration
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    morgan(morganFormat, {
        skip: function (_, res) {
            return res.statusCode < 400;
        },
        stream: process.stderr,
    })
);
app.use(
    morgan(morganFormat, {
        skip: function (_, res) {
            return res.statusCode >= 400;
        },
        stream: process.stdout,
    })
);
app.use(compression());
if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(require("errorhandler")());
}
// Routes middleware
app.get("/", (req, res) => {
    return res.status(200).json("Hello World");
});
app.use("/games", require("./routes"));
app.use((err, req, res, next) => {
    // Fallback to default node handler
    if (res.headersSent) {
        next(err);
        return;
    }

    res.status(err.status || 500).json({ error: err.message });
});
// Server run
module.exports = app;
