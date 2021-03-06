import { Request, Response } from "express";
import PostModel from "../models/PostModel";
import NotificationModel from "../models/NotificationModel";

class CommentsController {
  async create(request: any, response: Response) {
    try {
      const { id, username, profilePhoto, name } = request;
      const { body } = request.body;
      const { id: postId } = request.params;

      if (body.trim() === "") {
        return response.status(400).json({
          errors: { body: "O campo de comentário não pode estar vazio" },
        });
      }

      const post: any = await PostModel.findById(postId);

      if (!post) {
        return response
          .status(400)
          .json({ errors: { general: "Post não existe" } });
      }

      post.comments.unshift({
        body,
        username,
        followingUsername: username,
        profilePhotoURL: profilePhoto.url,
      });

      if (post.username !== username) {
        const newNotification = new NotificationModel({
          username: post.username,
          followingUsername: username,
          postId,
          profilePhotoURL: profilePhoto.url,
          body: `${name} comentou sua postagem!`,
          notificationType: "comment",
        });
        const notification = await newNotification.save();
        console.log(notification);
        request.io.emit("notification", { notification });
      }

      const result = await post.save();

      request.io.emit("commented-post", { post });

      return response.status(200).json({
        result,
      });
    } catch (err) {
      console.log(err);
      return response
        .status(404)
        .json({ errors: { message: "Não foi possível criar um comentário" } });
    }
  }

  async delete(request: any, response: Response) {
    try {
      const { username } = request;
      const { commentId } = request.body;
      const { id: postId } = request.params;

      const post: any = await PostModel.findById(postId);

      if (!post) {
        return response
          .status(400)
          .json({ errors: { general: "Post não existe" } });
      }

      const commentIndex = post.comments.findIndex(
        (comment: any) => comment.id === commentId
      );

      if (commentIndex === -1) {
        return response
          .status(400)
          .json({ errors: { general: "Comentário não existe" } });
      }

      if (post.comments[commentIndex].username === username) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        return response.status(200).json(post);
      } else {
        return response
          .status(400)
          .json({ errors: { message: "Ação não permitida" } });
      }
    } catch (err) {
      return response
        .status(404)
        .json({ errors: { message: "Não foi possível deletar o comentário" } });
    }
  }
}

export default CommentsController;
