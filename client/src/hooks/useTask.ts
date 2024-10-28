// useTask: to declare and export task-related function
import { z } from "zod";
import { taskSchema } from "../lib/zod";
import TASK_API from "../api/task.api";


export type TaskData = z.infer<typeof taskSchema>;

export default function useTask() {

    async function getTask(id: string): Promise<{ task: TaskData }> {
        try {
            const res = await TASK_API.get(`/profile?id=${id}`)
            return res.data;
        }
        catch (err) {
            // console.error("Error happened:", err);
            throw new Error;
        }
    }

    async function getTaskList(pageParam: string): Promise<{
        tasks: TaskData[];
        nextPage: number | null;
        previousPage: number | null;
        currentPage: number,
        totalPage: Number
    }> {
        try {

            const res = await TASK_API.get(`?page=${pageParam}`);

            if (res.status === 200) {
                // console.log(res)
                return res.data
            } else {
                throw new Error(`Request failed with status ${res.status}`);
            }
        } catch (err) {
            // console.error("Error happened:", err);
            return { tasks: [], currentPage: 1, nextPage: null, previousPage: null, totalPage: 1 };
        }
    }

    async function createTask(data: TaskData) {
        try {
            const { title, body, status } = data;

            const res = await TASK_API.put("/", { title, body, status }
            );

            if (res.status === 201) {
                return res.data;
            }
        } catch (err) {
            // console.error("Error happened:", err);

        }
    }

    async function updateTask(data: TaskData) {
        try {
            const { id, title, body, status } = data;
            const res = await TASK_API.patch(`?id=${id}`, { title, body, status }
            );
            return res.data;
        } catch (err) {
            // console.error("Error happened:", err);

        }
    }

    async function deleteTask(id: string) {
        try {
            const res = await TASK_API.delete(`?id=${id}`
            );
            return res.data;

        } catch (err) {
            // console.error("Error happened:", err);

        }
    }


    return { getTask, getTaskList, createTask, updateTask, deleteTask };
}
