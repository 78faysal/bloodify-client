import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://bloodify-server.vercel.app'
}) 
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;