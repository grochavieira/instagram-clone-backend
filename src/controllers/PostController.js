"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PostModel_1 = __importDefault(require("../models/PostModel"));
var UserModel_1 = __importDefault(require("../models/UserModel"));
var NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
var cloudinaryFunctions_1 = require("../utils/cloudinaryFunctions");
var imageToDataURI_1 = __importDefault(require("../utils/imageToDataURI"));
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, user, friendsUsernames, posts, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        username = request.username;
                        return [4 /*yield*/, UserModel_1.default.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, response.status(400).json({
                                    errors: { general: "Usuário não existe" },
                                })];
                        }
                        friendsUsernames = user.friends.map(function (friend) {
                            return friend.username;
                        });
                        friendsUsernames.push(username);
                        console.log({ friendsUsernames: friendsUsernames });
                        return [4 /*yield*/, PostModel_1.default.find({
                                username: { $in: friendsUsernames },
                            })];
                    case 2:
                        posts = _a.sent();
                        console.log(posts);
                        response.json(posts);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        response
                            .status(404)
                            .json({ errors: { message: "Não foi possível listar os posts" } });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, post, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = request.params.id;
                        return [4 /*yield*/, PostModel_1.default.findById(id)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            response.status(400).json({ errors: { general: "Post não existe" } });
                        }
                        response.json(post);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        response.status(404).json({ message: "Não foi possível pegar o post." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.search = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, posts, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        username = request.params.username;
                        return [4 /*yield*/, PostModel_1.default.find({
                                username: username,
                            })];
                    case 1:
                        posts = _a.sent();
                        return [2 /*return*/, response.status(200).json(posts)];
                    case 2:
                        err_1 = _a.sent();
                        response
                            .status(404)
                            .json({ errors: { message: "Não foi possível listar os posts" } });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, username, postFile, caption, postData, postImage, currentDate, newPost, post, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = request.id, username = request.username;
                        postFile = request.file;
                        caption = request.body.caption;
                        if (!postFile) {
                            return [2 /*return*/, response.status(400).json({
                                    errors: {
                                        postMedia: "É preciso inserir algum post antes de enviar",
                                    },
                                })];
                        }
                        postData = imageToDataURI_1.default(postFile);
                        return [4 /*yield*/, cloudinaryFunctions_1.cloudinaryUpload(postData)];
                    case 1:
                        postImage = _a.sent();
                        currentDate = new Date();
                        newPost = new PostModel_1.default({
                            postUrl: postImage.url,
                            publicId: postImage.public_id,
                            user: id,
                            username: username,
                            caption: caption !== undefined
                                ? {
                                    body: caption,
                                }
                                : {},
                        });
                        return [4 /*yield*/, newPost.save()];
                    case 2:
                        post = _a.sent();
                        request.io.emit("post-created", { post: post });
                        response.status(200).json({
                            post: post,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        response
                            .status(404)
                            .json({ errors: { message: "Não foi possível postar" } });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, postId, post, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        username = request.username;
                        postId = request.params.id;
                        return [4 /*yield*/, PostModel_1.default.findById(postId)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ errors: { general: "Post não existe" } })];
                        }
                        if (!(username === post.username)) return [3 /*break*/, 3];
                        return [4 /*yield*/, post.delete()];
                    case 2:
                        _a.sent();
                        request.io.emit("post-deleted", { post: post });
                        return [2 /*return*/, response
                                .status(200)
                                .json({ message: "Post deletado com sucesso" })];
                    case 3: return [2 /*return*/, response
                            .status(400)
                            .json({ errors: { general: "Ação não permitida" } })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        response
                            .status(404)
                            .json({ errors: { message: "Não foi possível deletar o post" } });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.like = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username_1, profilePhoto, name_1, postId, post, notification, newNotification, notification_1, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        username_1 = request.username, profilePhoto = request.profilePhoto, name_1 = request.name;
                        postId = request.params.id;
                        return [4 /*yield*/, PostModel_1.default.findById(postId)];
                    case 1:
                        post = _a.sent();
                        if (!post) return [3 /*break*/, 7];
                        if (!post.likes.find(function (like) { return like.username === username_1; })) return [3 /*break*/, 2];
                        post.likes = post.likes.filter(function (like) { return like.username !== username_1; });
                        return [3 /*break*/, 5];
                    case 2:
                        post.likes.push({
                            username: username_1,
                        });
                        return [4 /*yield*/, NotificationModel_1.default.findOne({
                                username: post.username,
                                postId: postId,
                                notificationType: "like",
                            })];
                    case 3:
                        notification = _a.sent();
                        if (!!notification) return [3 /*break*/, 5];
                        if (!(post.username !== username_1)) return [3 /*break*/, 5];
                        newNotification = new NotificationModel_1.default({
                            username: post.username,
                            postId: postId,
                            profilePhotoURL: profilePhoto.url,
                            body: name_1 + " curtiu sua postagem!",
                            notificationType: "like",
                        });
                        return [4 /*yield*/, newNotification.save()];
                    case 4:
                        notification_1 = _a.sent();
                        request.io.emit("notification", { notification: notification_1 });
                        _a.label = 5;
                    case 5: return [4 /*yield*/, post.save()];
                    case 6:
                        _a.sent();
                        request.io.emit("liked-post", { post: post });
                        return [2 /*return*/, response
                                .status(200)
                                .json({ message: "Ação realizada com sucesso" })];
                    case 7: return [2 /*return*/, response
                            .status(400)
                            .json({ errors: { general: "Post não existe" } })];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_3 = _a.sent();
                        console.log(err_3);
                        response
                            .status(404)
                            .json({ errors: { message: "Não foi possível realizar a ação" } });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}());
exports.default = PostController;
