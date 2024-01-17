import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosPublic } from "./useAxiosPublic";

const useAdmin = () => {
    const {user} = useAuth();

    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async() => {
            const {data} = await axiosPublic.get(`/users/admin/${user?.email}`);
            return data
        }
    })

    return [isAdmin, isAdminLoading];
};

export default useAdmin;