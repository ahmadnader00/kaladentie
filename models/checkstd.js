const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    studentid: {
      type: String,
      default: false,
    },
    year: {
      type: Number,
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const checkstd = mongoose.model("checkstd", schema);

module.exports = checkstd;
