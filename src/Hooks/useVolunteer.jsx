import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosSecure } from "./useAxiosSecure";

const useVolunteer = () => {
    const {user, loading} = useAuth();

    const {data: isVolunteer, isPending: isVolunteerLoading} = useQuery({
        queryKey: ['isVolunteer', user?.email],
        enabled: !loading,
        queryFn: async() => {
            const {data} = await axiosSecure.get(`/users/volunteer/${user?.email}`)
            console.log(data);
            return data;
        }
    })

    return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;