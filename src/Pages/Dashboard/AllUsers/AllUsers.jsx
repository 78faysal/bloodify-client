import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { laoding } = useAuth();
  const [filterValue, setFilterValue] = useState("active");
  const {
    data: users,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users", filterValue],
    enabled: !laoding,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?status=${filterValue}`);
      //   console.log(data);
      return data;
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setFilterValue(selectedValue);
    refetch();
  };

  const hanldeStatus = (user) => {
    if (user.status === "active") {
      user.status = "blocked";
      axiosSecure
        .patch(`/users/${user?.email}`, { status: user?.status })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("User Blocked");
          }
        });
    } else if (user.status === "blocked") {
      user.status = "active";
      axiosSecure
        .patch(`/users/${user?.email}`, { status: user?.status })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("User UnBlocked");
          }
        });
    }
  };

  const handleMakeAdmin = (user) => {
    user.role = "admin";
    axiosSecure
      .patch(`/users/${user?.email}`, { role: user?.role })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${user.name} got the Admin role`);
        }
      });
  };

  const handleMakeVolunteer = (user) => {
    user.role = "volunteer";
    axiosSecure
      .patch(`/users/${user?.email}`, { role: user?.role })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${user.name} got the volunteer role`);
        }
      });
  };

  // console.log(filterValue);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">All Users</h2>

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
        <option value="active">active</option>
        <option value="blocked">blocked</option>
      </select>

      {users?.length < 1 && (
        <div>
          <h2 className="text-xl font-semibold px-4">No User Available</h2>
        </div>
      )}

      {users?.length > 0 && !isPending && (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Avater</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Volunteer</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user?._id}>
                  <th>
                    <img
                      className="w-14 h-14 object-cover rounded-full"
                      src={user?.image}
                      alt=""
                    />
                  </th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <p
                        className={` py-1 rounded-sm ${
                          user?.status === "active"
                            ? "bg-green-200 px-3"
                            : "bg-red-200"
                        }`}
                      >
                        {user?.status}
                      </p>
                      <button
                        onClick={() => hanldeStatus(user)}
                        className="btn btn-sm"
                      >
                        {user?.status === "active" ? "Block" : "Unblock"}
                      </button>
                    </div>
                  </td>
                  <td className="gap-2">
                    {user?.role !== "volunteer" && (
                      <button
                        onClick={() => handleMakeVolunteer(user)}
                        className="btn btn-sm btn-outline btn-warning"
                      >
                        Make Volunteer
                      </button>
                    )}
                    {user?.role === "volunteer" && <span>{user?.role}</span>}
                  </td>
                  <td>
                    {user?.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm md:mx-2 max-sm:my-2 btn-error"
                      >
                        Make Admin
                      </button>
                    )}
                    {user?.role === "admin" && (
                      <span className="md:ml-5">{user?.role}</span>
                    )}
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

export default AllUsers;
