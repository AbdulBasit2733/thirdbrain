"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../Middleware/AuthMiddleware"));
const Content_1 = __importDefault(require("../Model/Content"));
const Tag_1 = __importDefault(require("../Model/Tag"));
const Link_1 = __importDefault(require("../Model/Link"));
const config_1 = require("../config/config");
const User_1 = __importDefault(require("../Model/User"));
const router = express_1.default.Router();
router.get("/my-contents", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.user._id;
        const contents = yield Content_1.default.find({ userId: userId })
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
router.post("/create-content", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //@ts-ignore
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const bodyData = req.body;
        console.log(bodyData);
        const tags = yield Tag_1.default.create({
            title: bodyData.tagTitle,
            userId: userId,
        });
        const contents = yield Content_1.default.create({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
router.put("/edit-content/:id", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.user._id;
        const bodyData = req.body;
        const contentId = req.params.id;
        const tags = yield Tag_1.default.findByIdAndUpdate(userId, {
            title: bodyData.tagTitle,
        });
        const contents = yield Content_1.default.findByIdAndUpdate(contentId, {
            title: bodyData.title,
            contentLink: bodyData.link,
            contentType: bodyData.type,
            tags: tags === null || tags === void 0 ? void 0 : tags._id,
        });
        res.status(200).json({
            success: true,
            message: "Content Updated Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
router.delete("/delete-content/:id", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.user._id;
        const contentId = req.params.id;
        const contents = yield Content_1.default.findByIdAndDelete(contentId);
        res.status(200).json({
            success: true,
            message: "Content Deleted Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
router.post("/brain/sharelink/create", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield Link_1.default.findOne({
            //@ts-ignore
            userId: req.user._id,
        });
        if (existingLink) {
            res.status(200).json({
                hash: existingLink.hash,
            });
            return;
        }
        const hash = (0, config_1.RandomLink)(10);
        yield Link_1.default.create({
            //@ts-ignore
            userId: req.user._id,
            hash: hash,
        });
        res.status(200).json({
            message: "/share/" + hash,
        });
    }
    else {
        yield Link_1.default.deleteOne({
            //@ts-ignore
            userId: req.user._id,
        });
        res.status(200).json({
            message: "Remove Link",
        });
    }
}));
router.get("/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield Link_1.default.findOne({ hash: hash });
    if (!link) {
        res.status(411).json({
            message: "Sorry Incorrect Input",
        });
        return;
    }
    const content = yield Content_1.default.find({
        userId: link.userId,
    });
    if (content.length === 0) {
        res.status(411).json({
            success: false,
            message: "Content Not Found",
        });
        return;
    }
    const user = yield User_1.default.findOne({ _id: link.userId }).select("-password");
    if (!user) {
        res.status(411).json({
            message: "User Not Found",
        });
        return;
    }
    res.status(200).json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content,
    });
}));
exports.default = router;
