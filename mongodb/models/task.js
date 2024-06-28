import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: false
    },
    timestamp: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    priority: {
        type: Boolean,
        required: true,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const taskModel = mongoose.model("Task",taskSchema);

export default taskModel;