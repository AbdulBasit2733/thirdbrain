import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: String,
  link: String,
  type:String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


export const ContentModel = mongoose.model('Content', ContentSchema);
