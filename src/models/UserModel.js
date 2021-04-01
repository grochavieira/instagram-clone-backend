"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("User", UserSchema);
