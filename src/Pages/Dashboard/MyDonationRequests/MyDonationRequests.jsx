import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [filterValue, setFilterValue] = useState("all");
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const axiosSecure = useAxiosSecure();
  const {
    data: recentDonations,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["my-donation-requests", filterValue, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation_requests/filter/${user?.email}?status=${filterValue}&page=${currentPage}&size=${itemPerPage}`
      );
      return data;
    },
  });

  useEffect(() => {
    axiosSecure.get(`/itemsCount`).then((res) => {
      setCount(res.data.myRequestsCount);
    });
  }, [axiosSecure, currentPage, itemPerPage]);

  const numberOfPages = Math.ceil(count / itemPerPage);

  const pages = [...Array(numberOfPages).keys()];

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

  const handleStatus = (donation, targetStatus) => {
    // setOparetionLaoding(true);
    console.log(targetStatus);
    axiosSecure
      .patch(`/donation_requests/${donation?._id}`, { targetStatus })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          //   setOparetionLaoding(false);
          //   console.log(oparetionLoading);
          refetch();
          toast.success(`Donation ${targetStatus}`);
        }
      });
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
        <option value="all">All</option>
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
                  <td>
                    {donation?.status !== "inprogress" && (
                      <span>{donation?.status}</span>
                    )}
                    {donation?.status === "inprogress" && (
                      <>
                        <p className="text-center font-semibold">Donor Info</p>
                        <span>{donation?.donor_name}, </span>
                        <span>{donation?.donor_email}</span>
                      </>
                    )}
                  </td>
                  <td className="gap-2">
                    {donation?.status === "pending" && (
                      <>
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
                      </>
                    )}

                    {donation?.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatus(donation, "done")}
                          className="btn btn-sm"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => handleStatus(donation, "canceled")}
                          className="btn btn-sm md:mx-2 max-sm:my-2 btn-error"
                        >
                          Cancel
                        </button>
                      </>
                    )}
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

      {filterValue === "all" && (
        <div className=" my-10 flex justify-center">
          <div className="join">
            {pages?.map((page) => (
              <input
                onClick={() => setCurrentPage(page)}
                key={page}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={page}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
