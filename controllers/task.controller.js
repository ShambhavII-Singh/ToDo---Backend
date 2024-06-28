import mongoose from 'mongoose';
import Task from '../mongodb/models/task.js';
import User from '../mongodb/models/user.js';
import Category from '../mongodb/models/category.js';

const getTasks = async (req, res) => {
    const { _start, _end, _order, _sort, category = "" } = req.query;
    const query = {};
    if (category !== "") {
        const catID = await Category.findOne({ title : category });
        query.category = catID
    };
    try {
        const count = await Task.countDocuments({ query });
        const tasks = await Task.find(query).limit(_end).skip(_start);
        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, timestamp, category, email } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);
        const cat = await Category.findOne({ title : category }).session(session);

        if (!user) throw new Error("User not found");
        if (!cat) throw new Error("Category not found");

        const newTask = await Task.create({
            title,
            description,
            timestamp,
            category: cat._id,
            creator: user._id,
        });

        user.allTasks.push(newTask._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json("Task created !!!");
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

const completeTask = async (req, res) => {
    try {
        const { id } = req.params;
        let {completed} = req.body;
        completed = !completed;

        await Task.findByIdAndUpdate(
            { _id: id },
            {
                completed
            },
        );

        res.status(200).json({ message: "Task status updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const priorityTask = async (req, res) => {
    try {
        const { id } = req.params;
        let {priority} = req.body;
        priority = !priority;

        await Task.findByIdAndUpdate(
            { _id: id },
            {
                priority
            },
        );

        res.status(200).json({ message: "Task priority updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, timestamp, category } = req.body;

        const cat = await Category.findOne({ title : category });

        if (!cat) throw new Error("Category not found");

        await Task.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                timestamp,
                category: cat._id,
            },
        );

        res.status(200).json("Task details updated !!!");
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        const user = await User.findOne({ email });
        const task = await Task.findOne({ _id : id });

        if (!user) throw new Error("User not found");
        if (!task) throw new Error("Task not found");

        await User.findByIdAndUpdate(
            { _id: user._id },
            { $pull : { allTasks : id } }
        );

        await Task.findByIdAndDelete({ _id : id });

        res.status(200).json("Task deleted !!!");
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getTasks,
    createTask,
    completeTask,
    priorityTask,
    updateTask,
    deleteTask,
};