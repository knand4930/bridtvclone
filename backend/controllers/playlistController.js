const UserSchema = require("../schemas/userSchema");
const VideoSchema = require("../schemas/videoSchema");
const PlaylistSchema = require("../schemas/playlistSchema");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const playlistController = {
  getPlaylistById: async (req, res, next) => {
    try {
      const playlist = await PlaylistSchema.find({ _id: req.body.playlistId }).populate("videos");

      res.status(200).json(playlist);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
  getPlaylists: async (req, res, next) => {
    try {
      const playlist = await PlaylistSchema.find({ userId: req.user._id }).populate("videos");

      res.status(200).json(playlist);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  postPlaylist: async (req, res, next) => {
    try {
      const playlist = await PlaylistSchema.create({ userId: req.user._id, ...req.body });

      res.status(200).json(playlist);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deletePlaylist: async (req, res, next) => {
    try {
      const playlist = await PlaylistSchema.findOneAndDelete({ _id: req.body.playlistId });

      res.status(200).json(playlist);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = playlistController;
