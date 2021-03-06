const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    createdBy: {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      userName: {
        type: String,
        required: true,
        min: 5,
        max: 12,
      },
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    likes: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    text: {
      type: String,
      min: 0,
      max: 120,
      trim: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = {
  Comment,
  commentSchema,
};
