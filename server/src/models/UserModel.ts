import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePhoto: {
    publicId: { type: String, required: true },
    url: { type: String, required: true },
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  friends: [
    {
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("User", UserSchema);
