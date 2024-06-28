import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    allCategories: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category" 
    }],
    allTasks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Task" 
    }]
})

const userModel = mongoose.model("User",userSchema);

export default userModel;