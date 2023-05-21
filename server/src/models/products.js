const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
    },
    operaId: {
      type: String,
      required: true,
    },
    brandId: {
      type: String,
      required: true,
    },
    imagesId: {
      type: String,
    },
    star: {
      type: Number,
    },
    slug: {
      type: String,
      required: true,
    },
    shortdescription: {
      type: String,
    },
    fulldescription: [
      {
        type: String,
      },
    ],
    number: {
      type: Number,
    },
    price: {
      type: Number,
    },
    pricesale: {
      type: Number,
    },
    new: {
      type: Number,
    },
    displayorder: {
      type: Number,
    },
    showonhomepage: {
      type: Number,
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
    created_by: {
      type: String,
    },
    updated_by: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ProductModal = mongoose.model("products", ProductsSchema);
module.exports = ProductModal;
