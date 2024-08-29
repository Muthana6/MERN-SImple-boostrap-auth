import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isFav: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdBy:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    avatar: String,
    avatarPublicId: String
}, {timestamps: true})



export default mongoose.model('Recipe', RecipeSchema)
