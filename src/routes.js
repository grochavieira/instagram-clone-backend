"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var upload_1 = __importDefault(require("./config/upload"));
var loginRequired_1 = __importDefault(require("./middlewares/loginRequired"));
var UserController_1 = __importDefault(require("./controllers/UserController"));
var PostController_1 = __importDefault(require("./controllers/PostController"));
var CommentController_1 = __importDefault(require("./controllers/CommentController"));
var NotificationController_1 = __importDefault(require("./controllers/NotificationController"));
var routes = express_1.Router();
var userController = new UserController_1.default();
var postController = new PostController_1.default();
var commentController = new CommentController_1.default();
var notificationController = new NotificationController_1.default();
// USER ROUTES
routes.get("/users/:username", loginRequired_1.default, userController.index);
routes.get("/user/:username", userController.show);
routes.post("/user/login", userController.login);
routes.post("/user", upload_1.default.single("file"), userController.store);
// POST ROUTES
routes.get("/post", loginRequired_1.default, postController.index);
routes.get("/post/:id", postController.show);
routes.get("/posts/:username", postController.search);
routes.post("/post", loginRequired_1.default, upload_1.default.single("file"), postController.create);
routes.delete("/post/:id", loginRequired_1.default, postController.delete);
// LIKE ROUTES
routes.post("/post/like/:id", loginRequired_1.default, postController.like);
// FOLLOW ROUTES
routes.put("/follow", loginRequired_1.default, userController.follow);
// COMMENTS ROUTES
routes.post("/comment/:id", loginRequired_1.default, commentController.create);
routes.delete("/comment/:id", loginRequired_1.default, commentController.delete);
// NOTIFICATION ROUTES
routes.get("/notifications", loginRequired_1.default, notificationController.index);
routes.put("/notifications/:id", loginRequired_1.default, notificationController.update);
exports.default = routes;
