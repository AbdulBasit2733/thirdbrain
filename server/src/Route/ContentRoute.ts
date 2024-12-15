import express from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import ContentModel from "../Model/Content";
import TagModel from "../Model/Tag";
import LinkModel from "../Model/Link";
import { RandomLink } from "../config/config";
import UserModel from "../Model/User";

const router = express.Router();

router.get("/my-contents", AuthMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.user._id;
    const contents = await ContentModel.find({ userId: userId })
      .populate("userId", "username")
      .populate("tags");
    if (contents.length === 0) {
      res.status(400).json({
        success: false,
        message: "No Content Available",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: contents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/create-content", AuthMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.user?._id;
    const bodyData = req.body;
    console.log(bodyData);

    const tags = await TagModel.create({
      title: bodyData.tagTitle,
      userId: userId,
    });

    const contents = await ContentModel.create({
      title: bodyData.title,
      contentLink: bodyData.link,
      contentType: bodyData.type,
      tags: tags._id,
      userId: userId,
    });

    res.status(200).json({
      success: true,
      message: "Content Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.put("/edit-content/:id", AuthMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.user._id;
    const bodyData = req.body;
    const contentId = req.params.id;

    const tags = await TagModel.findByIdAndUpdate(userId, {
      title: bodyData.tagTitle,
    });

    const contents = await ContentModel.findByIdAndUpdate(contentId, {
      title: bodyData.title,
      contentLink: bodyData.link,
      contentType: bodyData.type,
      tags: tags?._id,
    });

    res.status(200).json({
      success: true,
      message: "Content Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.delete("/delete-content/:id", AuthMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.user._id;
    const contentId = req.params.id;

    const contents = await ContentModel.findByIdAndDelete(contentId);

    res.status(200).json({
      success: true,
      message: "Content Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/brain/sharelink/create", AuthMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: req.user._id,
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
      userId: req.user._id,
      hash: hash,
    });
    res.status(200).json({
      message: "/share/" + hash,
    });
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.user._id,
    });
    res.status(200).json({
      message: "Remove Link",
    });
  }
});

router.get("/brain/:shareLink", async (req, res) => {
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
  const user = await UserModel.findOne({ _id: link.userId }).select(
    "-password"
  );
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

export default router;
