import mongoose, { Schema } from "mongoose";

const NotificationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  postId: { type: String, required: true },
  profilePhotoURL: { type: String, required: true },
  body: { type: String, required: true },
  wasRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", NotificationSchema);
