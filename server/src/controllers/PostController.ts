import { Request, Response } from "express";
import PostModel from "../models/PostModel";
import UserModel from "../models/UserModel";
import uploadImage from "../helpers/helpers";

class PostController {
  async index(request: any, response: Response) {
    try {
      const { username } = request;

      const user: any = await UserModel.findOne({ username });

      if (!user) {
        return response.status(400).json({
          erros: { general: "Usuário não existe" },
        });
      }

      const friendsUsernames = user.friends.map((friend: any) => {
        return friend.username;
      });

      friendsUsernames.push(username);

      console.log(friendsUsernames);

      const concatFriends = friendsUsernames.join("|");

      const friendsRegex = new RegExp("^" + concatFriends);
      console.log(friendsRegex);
      const posts = await PostModel.find({
        username: friendsRegex,
      });

      response.json(posts);
    } catch (e) {
      response
        .status(404)
        .json({ errors: { message: "Não foi possível listar os posts" } });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const post = await PostModel.findById(id);

      if (!post) {
        response.status(400).json({ errors: { general: "Post não existe" } });
      }

      response.json(post);
    } catch (e) {
      response.status(404).json({ message: "Unable to Get Post." });
    }
  }

  async search(request: any, response: Response) {
    try {
      const { username } = request;

      const posts = await PostModel.find({
        username,
      });

      return response.status(200).json(posts);
    } catch (err) {
      response
        .status(404)
        .json({ errors: { message: "Não foi possível listar os posts" } });
    }
  }

  async create(request: any, response: Response) {
    try {
      const { id, username } = request;
      const postFile = request.file;

      if (!postFile) {
        return response.status(400).json({
          errors: {
            postMedia: "É preciso inserir algum post antes de enviar",
          },
        });
      }

      const postUrl = await uploadImage(postFile);

      const newPost = new PostModel({
        postUrl,
        user: id,
        username,
      });

      const post = await newPost.save();

      response.status(200).json({
        post,
      });
    } catch (e) {
      response
        .status(404)
        .json({ errors: { message: "Não foi possível postar" } });
    }
  }

  async delete(request: any, response: Response) {
    try {
      const { username } = request;
      const { id: postId } = request.params;

      const post: any = await PostModel.findOne({ postId });

      if (!post) {
        return response
          .status(400)
          .json({ errors: { general: "Post não existe" } });
      }

      if (username === post.username) {
        await post.delete();
        return response
          .status(200)
          .json({ message: "Post deletado com sucesso" });
      } else {
        return response
          .status(400)
          .json({ errors: { general: "Ação não permitida" } });
      }
    } catch (err) {
      response
        .status(404)
        .json({ errors: { message: "Não foi possível deletar o post" } });
    }
  }

  async like(request: any, response: Response) {
    try {
      const { username } = request;
      const { id: postId } = request.params;

      const post: any = await PostModel.findById(postId);

      if (post) {
        if (post.likes.find((like: any) => like.username === username)) {
          post.likes = post.likes.filter(
            (like: any) => like.username !== username
          );
        } else {
          const currentDate = new Date();
          post.likes.push({
            username,
            createdAt: String(currentDate),
          });
        }

        await post.save();
        return response
          .status(200)
          .json({ message: "Ação realizada com sucesso" });
      } else {
        return response
          .status(400)
          .json({ errors: { general: "Post não existe" } });
      }
    } catch (err) {
      response
        .status(404)
        .json({ errors: { message: "Não foi possível realizar a ação" } });
    }
  }
}

export default PostController;
