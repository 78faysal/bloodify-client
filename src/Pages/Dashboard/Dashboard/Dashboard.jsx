import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LiaHourglassStartSolid } from "react-icons/lia";
import useAdmin from "../../../Hooks/useAdmin";
import { useEffect, useState } from "react";
import { LuUsers2 } from "react-icons/lu";
import { PiGitPullRequestLight } from "react-icons/pi";
import useVolunteer from "../../../Hooks/useVolunteer";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const [statistics, setStatistics] = useState({});
  const axiosSecure = useAxiosSecure();

  const {
    data: recentDonations,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["donation-requests"],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation_requests/filter/${user?.email}`
      );
      //   console.log(data);
      return data;
    },
  });

  useEffect(() => {
    axiosSecure.get("/statistics").then((res) => {
      setStatistics(res.data);
    });
  }, []);

  //   console.log(loading, recentDonations);

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

  const handleStatus = (donation, targetStatus) => {
    console.log(targetStatus);
    axiosSecure
      .patch(`/donation_requests/${donation?._id}`, { targetStatus })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`Donation ${targetStatus}`);
        }
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Welcome <span className="text-red-500">{user?.displayName} 🎉</span>
      </h2>

      {isPending && (
        <div className="min-h-screen flex justify-center items-center">
          <LiaHourglassStartSolid className="text-2xl animate-spin" />
        </div>
      )}

      {/* {recentDonations?.length < 1 && <div>
            <h1 className="text-2xl font-bold">You have not requested for any donation</h1>
        </div>} */}

      {recentDonations?.length > 0 &&
        isAdmin?.admin === false &&
        isVolunteer?.volunteer === false && (
          <div className="overflow-x-auto">
            <h3 className="text-xl font-semibold text-center my-4 mb-8">
              Your recent requests
            </h3>
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
                          <p className="text-center font-semibold">
                            Donor Info
                          </p>
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
            {recentDonations?.length > 3 && (
              <Link
                className="flex justify-center mt-5"
                to={"/dashboard/my-donation-requests"}
              >
                <button className="btn btn-outline btn-sm flex">
                  View All Requests
                </button>
              </Link>
            )}
          </div>
        )}

      {(isAdmin?.admin === true || isVolunteer?.volunteer === true) && (
        <div className="stats shadow mt-5 flex max-sm:flex-col">
          <div className="stat">
            <div className="stat-figure text-primary">
              <RiMoneyDollarCircleLine className="text-5xl" />
            </div>
            <div className="stat-title">Total Fundings</div>
            <div className="stat-value text-primary">25.6$</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <LuUsers2 className="text-5xl" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-secondary">
              {statistics?.users} <span className="text-3xl">/P</span>
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <PiGitPullRequestLight className="text-5xl" />
            </div>
            <div className="stat-title">Donation Requests</div>
            <div className="stat-value text-primary">
              {statistics?.donationRequests}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
