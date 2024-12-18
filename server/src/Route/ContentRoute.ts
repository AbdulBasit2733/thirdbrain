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
  try {
    const { share } = req.body;

    if (typeof share !== "boolean") {
      res.status(400).json({
        success: false,
        message: "Invalid 'share' value. It must be a boolean.",
      });
      return;
    }

    //@ts-ignore
    const userId = req.user._id;

    if (share) {
      // Check if a share link already exists
      const existingLink = await LinkModel.findOne({ userId });

      if (existingLink) {
        res.status(200).json({
          success: true,
          message: "Share Link Already Exists",
          hash: existingLink.hash,
        });
        return;
      }

      // Create a new share link
      const hash = RandomLink(10);
      await LinkModel.create({ userId, hash });

      res.status(201).json({
        success: true,
        message: "Share Link Created",
        link: `/share/${hash}`,
      });
      return;
    } else {
      // Remove existing share link
      await LinkModel.deleteOne({ userId });

      res.status(200).json({
        success: true,
        message: "Share Link Removed",
      });
      return;
    }
  } catch (error) {
    console.error("Error creating or removing share link:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
    return;
  }
});

router.get("/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({ hash: hash });
  if (!link) {
    res.status(411).json({
      success: false,
      message: "Sorry Incorrect Input",
    });
    return;
  }
  const content = await ContentModel.find({
    userId: link.userId,
  })
    .populate("userId", "-password")
    .populate("tags");
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
      success: false,
      message: "User Not Found",
    });
    return;
  }
  res.status(200).json({
    success: true,
    content: content,
  });
});

export default router;
