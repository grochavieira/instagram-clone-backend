import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
  postUrl: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  publicId: { type: String, required: true },
  caption: {
    type: {
      body: { type: String, required: true },
      createdAt: { type: String, required: true },
    },
    required: false,
  },
  comments: [
    {
      body: { type: String, required: true },
      username: { type: String, required: true },
      followingUsername: { type: String, required: false },
      profilePhotoURL: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likes: [
    {
      username: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default mongoose.model("Post", PostSchema);
