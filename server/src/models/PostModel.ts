import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
  postUrl: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  publicId: { type: String, required: true },
  caption: {
    body: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  comments: [
    {
      body: { type: String, required: true },
      username: { type: String, required: true },
      profilePhotoURL: { type: String, required: true },
      createdAt: { type: String, required: true },
    },
  ],
  likes: [
    {
      username: { type: String, required: true },
      createdAt: { type: String, required: true },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default mongoose.model("Post", PostSchema);
