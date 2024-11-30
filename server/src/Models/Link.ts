import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
    hash:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const LinkModel = mongoose.model('Link', LinkSchema);

export default LinkModel;
