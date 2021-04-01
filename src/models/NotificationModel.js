"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var NotificationSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    followingUsername: { type: String, required: false },
    postId: { type: String, required: false },
    profilePhotoURL: { type: String, required: true },
    body: { type: String, required: true },
    notificationType: { type: String, required: true },
    wasRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("Notification", NotificationSchema);
