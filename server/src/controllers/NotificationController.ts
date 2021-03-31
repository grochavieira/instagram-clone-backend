import { Request, Response } from "express";
import NotificationModel from "../models/NotificationModel";

class NotificationController {
  async index(request: Request | any, response: Response) {
    const { username } = request;

    const notifications: any = await NotificationModel.find({ username });

    if (notifications.length > 0) {
      return response.status(200).json(notifications);
    }
    return response.json([]);
  }
}

export default NotificationController;
