import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCurrentUser = () => {
    const {user} = useAuth();

    const { data: currentUserData, isPending: isCurrentUserLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users/${user?.email}`);
            // console.log(res.data);
          return res.data;
        },
      });

    return [currentUserData, isCurrentUserLoading];
};

export default useCurrentUser;