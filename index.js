import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import userRouter from './routers/user.routes.js';
import taskRouter from './routers/task.routes.js';
import categoryRouter from './routers/category.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: "Hello World!" });
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/categories", categoryRouter);

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_DB_URL);
        app.listen(8080, () => {console.log("started on http://localhost:8080")});
    } catch (error) {
        console.log(error);
    }
}

startServer();