import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";

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
      const { data } = await axiosSecure.get("/users");
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

  //   console.log(users);

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
                <th>Action</th>
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
                      {(user?.status === "active" && (
                        <button className="btn btn-sm">Block</button>
                      )) ||
                        (user?.status === "blocked" && (
                          <button className="btn btn-sm">Unblock</button>
                        ))}
                    </div>
                  </td>
                  <td className="gap-2">
                    <button className="btn btn-sm">Make Volunteer</button>
                    <button
                      //   onClick={() => handleDelete(user?._id)}
                      className="btn btn-sm md:mx-2 max-sm:my-2 btn-error"
                    >
                      <span className="flex items-center">Make Admin</span>
                    </button>
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
