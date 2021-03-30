import { Request, Response } from "express";
import PostModel from "../models/PostModel";
import UserModel from "../models/UserModel";
import {
  cloudinaryUpload,
  cloudinaryDelete,
} from "../utils/cloudinaryFunctions";
import imageToDataURI from "../utils/imageToDataURI";

class PostController {
  async index(request: any, response: Response) {
    try {
      const { username } = request;

      const user: any = await UserModel.findOne({ username });

      if (!user) {
        return response.status(400).json({
          errors: { general: "Usuário não existe" },
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
      response.status(404).json({ message: "Não foi possível pegar o post." });
    }
  }

  async search(request: any, response: Response) {
    try {
      const { username } = request.params;
      console.log({ username });

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
      const { caption } = request.body;

      if (!postFile) {
        return response.status(400).json({
          errors: {
            postMedia: "É preciso inserir algum post antes de enviar",
          },
        });
      }

      const postData = imageToDataURI(postFile);
      const postImage: any = await cloudinaryUpload(postData);

      const currentDate = new Date();

      const newPost = new PostModel({
        postUrl: postImage.url,
        publicId: postImage.public_id,
        user: id,
        username,
        caption:
          caption !== undefined
            ? {
                body: caption,
                createdAt: String(currentDate),
              }
            : {},
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

      const post: any = await PostModel.findById(postId);

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
      console.log(err);
      response
        .status(404)
        .json({ errors: { message: "Não foi possível realizar a ação" } });
    }
  }
}

export default PostController;
