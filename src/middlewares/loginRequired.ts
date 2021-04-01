import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

export default async (request: any, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).json({
      errors: {
        general: "É preciso fazer login",
      },
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET || "");
    const { id, name, email, username, profilePhoto, friends } = data;

    const user = await UserModel.findOne({
      username,
    });

    if (!user) {
      return response.status(401).json({
        errors: {
          username: "Usuário inválido",
        },
      });
    }

    request.id = id;
    request.name = name;
    request.email = email;
    request.username = username;
    request.profilePhoto = profilePhoto;
    request.friends = friends;
    return next();
  } catch (err) {
    return response.status(401).json({
      errors: {
        invalid_token: "Token expirado ou inválido",
      },
    });
  }
};
