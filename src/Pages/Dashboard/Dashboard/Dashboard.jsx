import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";

const Dashboard = () => {
  const { user } = useAuth();

  const {data: recentDonations} = useQuery({
    queryKey: ['donation-requests'],
    queryFn: async() => {
        const {data} = await axiosSecure.get(`/donation_requests?length=${3}`);
        return data;
    }
  })
  console.log(recentDonations?.length);
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Welcome <span className="text-red-500">{user?.displayName}</span>
      </h2>

      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold text-center my-4 mb-8">Your recent requests</h3>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {
                recentDonations.map((donation, idx) => <tr key={donation._id}>
                    <th>{idx+1}</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
