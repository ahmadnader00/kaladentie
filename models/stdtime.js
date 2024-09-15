const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
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

const stdtime = mongoose.model("stdtime", schema);

module.exports = stdtime;
