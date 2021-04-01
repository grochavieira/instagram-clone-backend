"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_data_uri_1 = __importDefault(require("image-data-uri"));
var imageToDataURI = function (image) {
    var dataBuffer = Buffer.from(image.buffer);
    var mediaType = image.mimetype.replace("/image", "");
    var imageData = image_data_uri_1.default.encode(dataBuffer, mediaType);
    return imageData;
};
exports.default = imageToDataURI;
