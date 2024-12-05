import express, { Router, Request, Response } from "express";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
import { ContentModel } from "../Models/Content";
import LinkModel from "../Models/Link";
import { RandomLink } from "../utils";
import UserModel from "../Models/User";

const ContentRouter: Router = express.Router();

ContentRouter.get(
  "/all-contents",AuthMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      // //@ts-ignore
      // const user = req.user;
      const contents = await ContentModel.find().populate("userId", "username");
      if (contents && contents.length === 0) {
        return res.status(200).json({
          success: false,
          message: "Contents Not Found",
        });
      }
      res.status(200).json({
        success: true,
        contents: contents,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);
ContentRouter.get(
  "/user-contents",
  AuthMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      //@ts-ignore
      const user = req.user;
      const contents = await ContentModel.find({ userId: user._id }).populate(
        "userId",
        "username"
      );
      if (contents && contents.length === 0) {
        return res.status(200).json({
          success: false,
          message: "Contents Not Found",
        });
      }
      res.status(200).json({
        success: true,
        contents: contents,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

ContentRouter.post(
  "/create-content",
  AuthMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const bodyData = req.body;
      //@ts-ignore
      const user = req.user;

      await ContentModel.create({
        title: bodyData.title,
        link: bodyData.link,
        type: bodyData.type,
        tags: bodyData.tags,
        userId: user._id,
      });
      res.status(200).json({
        success: true,
        message: "Content Created Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

ContentRouter.delete(
  "/delete",
  AuthMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      //@ts-ignore
      const user = req.user;
      const data = req.body;
      

      const deletedContent = await ContentModel.findByIdAndDelete({
        _id: data.contentId,
        userId: user._id,
      });
      if (!deletedContent) {
        return res.status(400).json({
          success: false,
          message: "Unsuccessfull Deletion",
        });
      }
      res.status(200).json({
        success: true,
        message: "Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);
ContentRouter.put(
  "/edit",
  AuthMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      //@ts-ignore
      const user = req.user;
      const bodyData = req.body;

      const content = await ContentModel.findByIdAndUpdate(
        { _id: bodyData.contentId, userId: user._id },
        {
          title: bodyData.title,
          type: bodyData.type,
          tags: bodyData.tags,
          link: bodyData.link,
        }
      );

      res.status(200).json({
        success: true,
        message: "Edited Content Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

ContentRouter.post(
  "/brain/share",
  AuthMiddleware,
  async (req: Request, res: Response) => {
    const share = req.body.share;
    if (share) {
      const existingLink = await LinkModel.findOne({
        //@ts-ignore
        userId: req.userId,
      });
      if (existingLink) {
        res.status(200).json({
          hash: existingLink.hash,
        });
        return;
      }
      const hash = RandomLink(10);
      await LinkModel.create({
        //@ts-ignore
        userId: req.userId,
        hash: hash,
      });
      res.status(200).json({
        message: "/share/" + hash,
      });
    } else {
      await LinkModel.deleteOne({
        //@ts-ignore
        userId: req.userId,
      });
      res.status(200).json({
        message: "Remove Link",
      });
    }
  }
);

ContentRouter.get("/brain/:shareLink", async (req: Request, res: Response) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({ hash: hash });
  if (!link) {
    res.status(411).json({
      message: "Sorry Incorrect Input",
    });
    return;
  }
  const content = await ContentModel.find({
    userId: link.userId,
  });
  if (content.length === 0) {
    res.status(411).json({
      success: false,
      message: "Content Not Found",
    });
    return;
  }
  const user = await UserModel.findOne({ _id: link.userId });
  if (!user) {
    res.status(411).json({
      message: "User Not Found",
    });
    return;
  }
  res.status(200).json({
    username: user?.username,
    content: content,
  });
});

export default ContentRouter;
