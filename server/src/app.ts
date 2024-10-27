import express from 'express';
import cors from 'cors'
import taskRouter from './routes/task.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: "*" }))

app.use("/api/task", taskRouter)

export default app;
