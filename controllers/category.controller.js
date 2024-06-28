import mongoose from 'mongoose';
import Category from '../mongodb/models/category.js';
import User from '../mongodb/models/user.js';
import Task from '../mongodb/models/task.js';

const getCategories = async (req, res) => {
    try {
        const users = await Category.find({}).limit(req.query._end);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { title, description, email } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        const newCategory = await Category.create({
            title,
            description,
            creator: user._id,
        });

        user.allCategories.push(newCategory._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json("Category created !!!");
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const cat = await Category.findOne({ _id : id });

        if (!cat) throw new Error("Category not found");

        await Category.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description
            },
        );

        res.status(200).json("Category details updated !!!");
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getCategories,
    createCategory,
    updateCategory,
};