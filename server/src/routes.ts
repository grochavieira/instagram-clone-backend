import { Router } from "express";
import upload from "./config/upload";

import loginRequired from "./middlewares/loginRequired";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";
import CommentsController from "./controllers/CommentsController";

const routes = Router();

const userController = new UserController();
const postController = new PostController();
const commentsController = new CommentsController();

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
routes.post("/comment/:id", loginRequired, commentsController.create);
routes.delete("/comment/:id", loginRequired, commentsController.delete);

export default routes;
