// useTask: to declare and export task related function

export default function useTask() {
    async function getTask() { }
    async function createTask() { }
    async function updateTask() { }
    async function deleteTask() { }
    return { getTask, createTask, updateTask, deleteTask }
}