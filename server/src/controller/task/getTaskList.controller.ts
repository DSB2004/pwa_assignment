import { Response, Request } from "express";
import prisma from "../../lib/prisma";

const GetTaskList = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query['page']) || 0;
        const pageSize = 10;

        const skip = page * pageSize;

        const tasks = await prisma.task.findMany({
            select: {
                id: true,
                title: true,
                status: true,
            },
            skip: skip,
            take: pageSize,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return response.status(200).json({
            tasks,
            pageSize: Math.min(pageSize, tasks.length),
            previousPage: page > 0 ? page - 1 : null,
            currentPage: page,
            nextPage: tasks.length === pageSize ? page + 1 : null
        });
    } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ message: "Internal server error" });
    }
};

export default GetTaskList;
