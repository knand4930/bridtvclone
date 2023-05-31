const mongoose = require("mongoose");
const { Schema } = mongoose;

const playlistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  title: { type: Schema.Types.String },
  videos: [{ type: Schema.Types.ObjectId, ref: "video" }],
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const playlist = mongoose.model("playlist", playlistSchema);

module.exports = playlist;
