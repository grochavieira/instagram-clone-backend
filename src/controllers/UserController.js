"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var UserModel_1 = __importDefault(require("../models/UserModel"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cloudinaryFunctions_1 = require("../utils/cloudinaryFunctions");
var imageToDataURI_1 = __importDefault(require("../utils/imageToDataURI"));
var validators_1 = require("../utils/validators");
var NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
var generateToken = function (user) {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePhoto: user.profilePhoto,
        friends: user.friends,
    }, process.env.TOKEN_SECRET || "", { expiresIn: process.env.TOKEN_EXPIRES_IN || "1h" });
};
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, usernameRegexp, users, filteredUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.username;
                        usernameRegexp = new RegExp("^" + request.params.username);
                        return [4 /*yield*/, UserModel_1.default.find({ username: usernameRegexp })];
                    case 1:
                        users = _a.sent();
                        if (users.length > 0) {
                            filteredUsers = users.filter(function (user) { return user.username !== username; });
                            return [2 /*return*/, response.json(filteredUsers)];
                        }
                        else {
                            return [2 /*return*/, response.json([])];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params.username;
                        return [4 /*yield*/, UserModel_1.default.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ errors: { user: "Esse usuário não existe" } })];
                        }
                        return [2 /*return*/, response.status(200).json(user)];
                }
            });
        });
    };
    UserController.prototype.login = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, _b, valid, errors, user, match, token, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = request.body, username = _a.username, password = _a.password;
                        _b = validators_1.validateLoginInput(username, password), valid = _b.valid, errors = _b.errors;
                        if (!valid)
                            return [2 /*return*/, response.status(400).json({ errors: errors })];
                        return [4 /*yield*/, UserModel_1.default.findOne({ username: username })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            errors.general = "Nome de usuário não existe";
                            return [2 /*return*/, response.status(400).json({ errors: errors })];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        match = _c.sent();
                        if (!match) {
                            errors.general = "Senha incorreta";
                            return [2 /*return*/, response.status(400).json({ errors: errors })];
                        }
                        console.log({ user: user });
                        token = generateToken(user);
                        delete user.password;
                        response.status(200).json({
                            user: __assign(__assign({}, user._doc), { id: user._id }),
                            token: token,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        console.log(err_1);
                        response.status(404).json({
                            errors: {
                                message: "Não foi possível logar",
                            },
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var profilePhoto, _a, name_1, email, username, password, confirmPassword, _b, valid, errors, profileData, profileImage, user, passwordHash, newUser, result, token, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        profilePhoto = request.file;
                        _a = request.body, name_1 = _a.name, email = _a.email, username = _a.username, password = _a.password, confirmPassword = _a.confirmPassword;
                        _b = validators_1.validateRegisterInput(name_1, profilePhoto, username, email, password, confirmPassword), valid = _b.valid, errors = _b.errors;
                        if (!valid)
                            return [2 /*return*/, response.status(400).json({ errors: errors })];
                        profileData = imageToDataURI_1.default(profilePhoto);
                        return [4 /*yield*/, cloudinaryFunctions_1.cloudinaryUpload(profileData)];
                    case 1:
                        profileImage = _c.sent();
                        console.log({ profileImage: profileImage });
                        return [4 /*yield*/, UserModel_1.default.findOne({ username: username })];
                    case 2:
                        user = _c.sent();
                        if (user) {
                            return [2 /*return*/, response.status(400).json({
                                    errors: {
                                        username: "Nome de usuário já existe",
                                    },
                                })];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
                    case 3:
                        passwordHash = _c.sent();
                        newUser = new UserModel_1.default({
                            name: name_1,
                            email: email,
                            username: username,
                            password: passwordHash,
                            profilePhoto: {
                                publicId: profileImage.public_id,
                                url: profileImage.url,
                            },
                        });
                        return [4 /*yield*/, newUser.save()];
                    case 4:
                        result = _c.sent();
                        token = generateToken(result);
                        return [2 /*return*/, response.status(200).json(__assign(__assign({}, result._doc), { id: result._id, token: token }))];
                    case 5:
                        err_2 = _c.sent();
                        console.log(err_2);
                        response.status(404).json({
                            errors: {
                                message: "Não foi possível criar o usuário",
                            },
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.follow = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, profilePhoto, name_2, friendUsername_1, user, currentDate, notification, newNotification, notification_1, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        username = request.username, profilePhoto = request.profilePhoto, name_2 = request.name;
                        friendUsername_1 = request.body.friendUsername;
                        return [4 /*yield*/, UserModel_1.default.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, response.status(400).json({
                                    errors: {
                                        message: "Usuário não existe",
                                    },
                                })];
                        }
                        if (!user.friends.find(function (friend) { return friend.username === friendUsername_1; })) return [3 /*break*/, 2];
                        user.friends = user.friends.filter(function (friend) { return friend.username !== friendUsername_1; });
                        return [3 /*break*/, 5];
                    case 2:
                        currentDate = new Date();
                        user.friends.push({
                            username: friendUsername_1,
                            createdAt: String(currentDate),
                        });
                        return [4 /*yield*/, NotificationModel_1.default.findOne({
                                username: friendUsername_1,
                                followingUsername: username,
                                notificationType: "follow",
                            })];
                    case 3:
                        notification = _a.sent();
                        if (!!notification) return [3 /*break*/, 5];
                        newNotification = new NotificationModel_1.default({
                            username: friendUsername_1,
                            followingUsername: username,
                            profilePhotoURL: profilePhoto.url,
                            body: name_2 + " come\u00E7ou a te seguir!",
                            notificationType: "follow",
                        });
                        return [4 /*yield*/, newNotification.save()];
                    case 4:
                        notification_1 = _a.sent();
                        request.io.emit("notification", { notification: notification_1 });
                        _a.label = 5;
                    case 5: return [4 /*yield*/, user.save()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, response.status(200).json(user)];
                    case 7:
                        err_3 = _a.sent();
                        console.log(err_3);
                        response.status(404).json({
                            errors: {
                                message: "Não foi possível seguir o usuário",
                            },
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
