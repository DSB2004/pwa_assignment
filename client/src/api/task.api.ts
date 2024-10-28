
import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL as string

const TASK_API = axios.create({ baseURL: backend_url.concat("/task") })

export default TASK_API;