import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 30,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    hashtags: [{
        type: String,
        trim: true,
    }],
    imageUrl: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export default mongoose.model("Post", postSchema);
