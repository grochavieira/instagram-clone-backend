import { Router } from "express";
import upload from "./config/upload";

import loginRequired from "./middlewares/loginRequired";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";
import CommentController from "./controllers/CommentController";
import NotificationController from "./controllers/NotificationController";

const routes = Router();

const userController = new UserController();
const postController = new PostController();
const commentController = new CommentController();
const notificationController = new NotificationController();

// USER ROUTES
routes.get("/users/:username", loginRequired, userController.index);
routes.get("/user/:username", userController.show);
routes.post("/user/login", userController.login);
routes.post("/user", upload.single("file"), userController.store);

// POST ROUTES
routes.get("/post", loginRequired, postController.index);
routes.get("/post/:id", postController.show);
routes.get("/posts/:username", postController.search);
routes.post(
  "/post",
  loginRequired,
  upload.single("file"),
  postController.create
);
routes.delete("/post/:id", loginRequired, postController.delete);

// LIKE ROUTES
routes.post("/post/like/:id", loginRequired, postController.like);

// FOLLOW ROUTES
routes.put("/follow", loginRequired, userController.follow);

// COMMENTS ROUTES
routes.post("/comment/:id", loginRequired, commentController.create);
routes.delete("/comment/:id", loginRequired, commentController.delete);

// NOTIFICATION ROUTES
routes.get("/notifications", loginRequired, notificationController.index);
routes.put("/notifications/:id", loginRequired, notificationController.update);

export default routes;
