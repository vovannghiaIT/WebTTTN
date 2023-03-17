const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },

    picture: [
      {
        type: String,
      },
    ],
    displayorder: {
      type: String,
    },
    alt: {
      type: String,
    },
    title: {
      type: String,
    },
    status: {
      type: Number,
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ImagesModal = mongoose.model("images", ImagesSchema);
module.exports = ImagesModal;
