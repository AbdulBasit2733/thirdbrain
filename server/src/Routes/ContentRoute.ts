import express, { Router, Request, Response } from "express";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
import {
  AllContents,
  CreateContents,
  CreateShareLink,
  DeleteContent,
  EditContent,
  GetSharedLinkData,
  UserContents,
} from "../Controller/ContentController";

const ContentRouter: Router = express.Router();

ContentRouter.get("/all-contents", AuthMiddleware, AllContents);

ContentRouter.get("/user-contents", AuthMiddleware, UserContents);

ContentRouter.post("/create-content", AuthMiddleware, CreateContents);

ContentRouter.delete("/delete", AuthMiddleware, DeleteContent);

ContentRouter.put("/edit", AuthMiddleware, EditContent);

ContentRouter.post("/brain/share", AuthMiddleware, CreateShareLink);

ContentRouter.get("/brain/:shareLink", GetSharedLinkData);

export default ContentRouter;
