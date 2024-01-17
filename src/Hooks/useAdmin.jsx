import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosPublic } from "./useAxiosPublic";

const useAdmin = () => {
    const {user} = useAuth();

    const {data: isAdmin} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async() => {
            const {data} = await axiosPublic(`http://localhost:5000/users?email=${user?.email}`);
            return data
        }
    })

    return [isAdmin];
};

export default useAdmin;