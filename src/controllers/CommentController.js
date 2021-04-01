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
var NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
var CommentsController = /** @class */ (function () {
    function CommentsController() {
    }
    CommentsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, username, profilePhoto, name_1, body, postId, post, currentDate, newNotification, notification, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = request.id, username = request.username, profilePhoto = request.profilePhoto, name_1 = request.name;
                        body = request.body.body;
                        postId = request.params.id;
                        if (body.trim() === "") {
                            return [2 /*return*/, response.status(400).json({
                                    errors: { body: "O campo de comentário não pode estar vazio" },
                                })];
                        }
                        return [4 /*yield*/, PostModel_1.default.findById(postId)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ errors: { general: "Post não existe" } })];
                        }
                        currentDate = new Date();
                        post.comments.unshift({
                            body: body,
                            username: username,
                            profilePhotoURL: profilePhoto.url,
                            createdAt: String(currentDate),
                        });
                        if (!(post.username !== username)) return [3 /*break*/, 3];
                        newNotification = new NotificationModel_1.default({
                            username: post.username,
                            postId: postId,
                            profilePhotoURL: profilePhoto.url,
                            body: name_1 + " comentou sua postagem!",
                        });
                        return [4 /*yield*/, newNotification.save()];
                    case 2:
                        notification = _a.sent();
                        request.io.emit("notification", { notification: notification });
                        _a.label = 3;
                    case 3: return [4 /*yield*/, post.save()];
                    case 4:
                        result = _a.sent();
                        request.io.emit("commented-post", { post: post });
                        return [2 /*return*/, response.status(200).json({
                                result: result,
                            })];
                    case 5:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, response
                                .status(404)
                                .json({ errors: { message: "Não foi possível criar um comentário" } })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CommentsController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, commentId_1, postId, post, commentIndex, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        username = request.username;
                        commentId_1 = request.body.commentId;
                        postId = request.params.id;
                        return [4 /*yield*/, PostModel_1.default.findById(postId)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ errors: { general: "Post não existe" } })];
                        }
                        commentIndex = post.comments.findIndex(function (comment) { return comment.id === commentId_1; });
                        if (commentIndex === -1) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ errors: { general: "Comentário não existe" } })];
                        }
                        if (!(post.comments[commentIndex].username === username)) return [3 /*break*/, 3];
                        post.comments.splice(commentIndex, 1);
                        return [4 /*yield*/, post.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(200).json(post)];
                    case 3: return [2 /*return*/, response
                            .status(400)
                            .json({ errors: { message: "Ação não permitida" } })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, response
                                .status(404)
                                .json({ errors: { message: "Não foi possível deletar o comentário" } })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return CommentsController;
}());
exports.default = CommentsController;
