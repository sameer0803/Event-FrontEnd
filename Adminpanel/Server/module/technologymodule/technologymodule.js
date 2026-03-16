
const mongoose = require("mongoose");
const techSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "techCategory",
      required: true,
    },

     videoUrl: {
      type: String,
    },
    videoPublicId: {
      type: String, // useful for later deletion
    },

    images: {
      type: [String],           // array of image URLs
      default: [],
    },
    videoUrl: {
      type: String,
      default: null,
    },
    videoPublicId: {
      type: String,
      default: null,
    },
    images: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Technology", techSchema);
