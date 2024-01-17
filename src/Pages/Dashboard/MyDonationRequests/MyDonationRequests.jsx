import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { LiaHourglassStartSolid } from "react-icons/lia";

const MyDonationRequests = () => {
  const {
    data: recentDonations,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["my-donation-requests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation_requests`);
      return data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation_requests/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-5">My Donation Requests</h2>

      {isPending && (
        <div className="min-h-screen flex justify-center items-center">
          <LiaHourglassStartSolid className="text-2xl animate-spin" />
        </div>
      )}

      {recentDonations?.length > 0 && !isPending && (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Recipient name</th>
                <th>Recipient Location</th>
                <th>Donation Date</th>
                <th>Donation Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentDonations?.map((donation) => (
                <tr key={donation?._id}>
                  <th>{donation?.recipient_name}</th>
                  <td>
                    {donation?.district}, {donation?.upazilla}
                  </td>
                  <td>{donation?.date}</td>
                  <td>{donation?.time}</td>
                  <td>{donation?.status}</td>
                  <td className="gap-2">
                    <Link
                      to={`/dashboard/update-donation-request/${donation?._id}`}
                    >
                      <button className="btn btn-sm">Update</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(donation?._id)}
                      className="btn btn-sm md:mx-2 max-sm:my-2 btn-error"
                    >
                      <span className="flex items-center">
                        <RiDeleteBin5Line /> Delete
                      </span>
                    </button>
                    <button className="btn btn-sm btn-outline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentDonations?.length > 3 && (
            <Link
              className="flex justify-center mt-5"
              to={"/my-donation-requests"}
            >
              <button className="btn btn-outline btn-sm flex">
                View All Requests
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
