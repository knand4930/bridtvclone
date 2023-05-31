const PlayerSchema = require("../schemas/playerSchema");
const createError = require("http-errors");

const playerController = {
  getPlayerById: async (req, res, next) => {
    try {
      const player = await PlayerSchema.find({ _id: req.body.playerId });

      res.status(200).json(player);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getPlayer: async (req, res, next) => {
    try {
      const player = await PlayerSchema.find({ userId: req.user._id });

      res.status(200).json(player);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  postPlayer: async (req, res, next) => {
    try {
      const player = await PlayerSchema.create({ userId: req.user._id, ...req.body });

      res.status(200).json(player);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deletePlayer: async (req, res, next) => {
    try {
      const player = await PlayerSchema.findOneAndDelete({ _id: req.body.playerId });

      res.status(200).json(player);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = playerController;
