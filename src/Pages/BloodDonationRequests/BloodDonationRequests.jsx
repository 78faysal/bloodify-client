import { useQuery } from "@tanstack/react-query";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BloodDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: pendingRequests, isPending } = useQuery({
    queryKey: ["pending-requests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation_requests?status=pending`
      );
      return data;
    },
  });

  //   console.log(pendingRequests);
  return (
    <div className="pt-24 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center">All Requests</h2>
      <p className="text-center mb-10">
        Let us change the world with a simple act of kindness. Your one donation
        can save a whole life.
      </p>

      {isPending && (
        <div className="min-h-screen flex justify-center items-center">
          <LiaHourglassStartSolid className="text-2xl animate-spin" />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-10 md:w-[90%] mx-auto mt-5">
        {pendingRequests?.map((request) => (
          <div key={request?._id} className="card bg-base-100 hover:shadow-xl">
            <div className="card-body p-5">
              <h2 className="card-title">
                {request?.requester_name}{" "}
                {request?.requester_email === user?.email && (
                  <div className="badge badge-secondary">Your Request</div>
                )}
              </h2>
              <p>
                Location: {request?.district}, {request?.upazilla}
              </p>
              <p>Date: {request?.date}</p>
              <p>Time: {request?.time}</p>
              <Link to={`/donation-requests/${request._id}`}>
                <button className="btn w-full">View Detail</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodDonationRequests;
