import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

const categoryModel = mongoose.model("Category",categorySchema);

export default categoryModel;