const UserSchema = require("../schemas/userSchema");
const VideoSchema = require("../schemas/videoSchema");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const videosController = {
  getVideosAll: async (req, res, next) => {
    try {
      const videos = await VideoSchema.find();

      res.status(200).json(videos);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getVideos: async (req, res, next) => {
    try {
      const videos = await VideoSchema.find({ userId: req.user._id });

      res.status(200).json(videos);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  postVideo: async (req, res, next) => {
    try {
      const video = req.file;

      const filePath = `http://localhost:4000/${video.destination}/${video.filename}`;

      const videos = await VideoSchema.create({ userId: req.user._id, file: filePath, title: req.body.title });

      res.status(200).json(videos);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deleteVideo: async (req, res, next) => {
    try {
      const videos = await VideoSchema.findOneAndDelete({ _id: req.body.videoId });

      res.status(200).json(videos);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = videosController;
