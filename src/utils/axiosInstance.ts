import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:3024'
})
// http://54.175.91.94
export default axiosInstance