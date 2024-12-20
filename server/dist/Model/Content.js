"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ContentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    contentLink: {
        type: String,
    },
    contentType: {
        type: String,
    },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const ContentModel = mongoose_1.default.model("Content", ContentSchema);
exports.default = ContentModel;
