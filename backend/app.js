const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");

cors = require("cors");
const corsOptions = {
  origin: true,
  credentials: true,
};
app.options("*", cors(corsOptions));

// Static Middleware
const public = path.resolve(__dirname, "public");
app.use(express.static(public));

// View Engine Setup
app.set("views", path.join(__dirname, "views"));

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

const sessionRoutes = require("./routes/sessionRoutes");
const videoRoutes = require("./routes/videosRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const contentUnitRoutes = require("./routes/contentUnitRoutes");
const playerRoutes = require("./routes/playerRoutes");

app.use("/api/session", sessionRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/contentUnit", contentUnitRoutes);
app.use("/api/player", playerRoutes);

app.use("/public", express.static(path.join(__dirname, "public")));

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });

module.exports = app;
