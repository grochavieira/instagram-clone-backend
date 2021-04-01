import { Request, Response } from "express";
import NotificationModel from "../models/NotificationModel";

class NotificationController {
  async index(request: Request | any, response: Response) {
    try {
      const { username } = request;

      const notifications: any = await NotificationModel.find({ username });

      if (notifications.length > 0) {
        return response.status(200).json(notifications);
      }
      return response.json([]);
    } catch (err) {
      console.log(err);
      response.status(404).json({
        errors: {
          message: "Não foi possível pegar as notificações",
        },
      });
    }
  }

  async update(request: Request | any, response: Response) {
    try {
      const { username } = request;
      const { id } = request.params;

      const notification: any = await NotificationModel.findById(id);

      notification.wasRead = true;

      await notification.save();

      return response.status(200).json(notification);
    } catch (err) {
      console.log(err);
      response.status(404).json({
        errors: {
          message: "Não foi possível atualizar a notificação",
        },
      });
    }
  }
}

export default NotificationController;
