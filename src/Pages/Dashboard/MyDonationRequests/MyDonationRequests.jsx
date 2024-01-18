import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [filterValue, setFilterValue] = useState("pending");
  const {
    data: recentDonations,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["my-donation-requests", filterValue],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation_requests/filter/${user?.email}`
      );
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

  const handleChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setFilterValue(selectedValue);
    refetch();
  };

  //   console.log(filterValue);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-5">
        My Donation Requests
      </h2>

      {isPending && (
        <div className="min-h-screen flex justify-center items-center">
          <LiaHourglassStartSolid className="text-2xl animate-spin" />
        </div>
      )}

      <select
        onChange={handleChange}
        className="mb-5 md:ml-4 border p-2 px-3"
        value={filterValue}
        name="status"
      >
        {/* <option defaultChecked aria-readonly value="pending">Filter</option> */}
        <option value="pending">pending</option>
        <option value="inprogress">inprogress</option>
        <option value="done">done</option>
        <option value="canceled">canceled</option>
      </select>

      {recentDonations?.length < 1 && (
        <div>
          <h2 className="text-xl font-semibold px-4">No Data Available</h2>
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
                    <Link
                      to={`/dashboard/donation-request-detail/${donation?._id}`}
                    >
                      <button className="btn btn-sm btn-outline">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
