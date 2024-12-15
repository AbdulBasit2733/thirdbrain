import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  contentLink: {
    type: String,
  },
  contentType: {
    type: String,
  },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ContentModel = mongoose.model("Content", ContentSchema);

export default ContentModel;
