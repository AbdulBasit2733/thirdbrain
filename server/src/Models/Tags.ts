import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:String
});

const TagModel = mongoose.model('Tag', TagSchema );

export default TagModel
