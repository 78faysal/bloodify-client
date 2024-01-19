import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LiaHourglassStartSolid } from "react-icons/lia";
import useAdmin from "../../../Hooks/useAdmin";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ContentManagement = () => {
  const [filterValue, setFilterValue] = useState("all");
  const axiosSecure = useAxiosSecure();
  const [oparetionLoading, setOparetionLaoding] = useState(false);
  const [isAdmin] = useAdmin();

  const {
    data: blogs,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["blogs", filterValue],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/blogs?status=${filterValue}`);
      return data;
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setFilterValue(selectedValue);
    // refetch();
  };

  const hanldeDelete = (id) => {
    axiosSecure.delete(`/blogs/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Blog Deleted Successfully");
      }
    });
  };

  const handleBlogStatus = (blog) => {
    setOparetionLaoding(true);
    axiosSecure
      .patch(`/blogs/${blog?._id}?status=${blog?.status}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          setOparetionLaoding(false);
          //   console.log(oparetionLoading);
          refetch();
          toast.success("Blog status changed");
        }
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-4">
        Content Management
      </h2>

      {isPending ||
        (oparetionLoading && (
          <div className="min-h-screen flex justify-center items-center">
            <LiaHourglassStartSolid className="text-2xl animate-spin" />
          </div>
        ))}

      <div className="flex justify-between items-center md:mr-5">
        <select
          onChange={handleChange}
          className="mb-5 md:ml-4 border p-2 px-3 mt-5"
          value={filterValue}
          name="status"
        >
          {/* <option defaultChecked aria-readonly value="pending">Filter</option> */}
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <Link to={"/dashboard/content-management/add-blog"}>
          <button className="btn btn-outline max-sm:btn-md">Add Content</button>
        </Link>
      </div>

      {blogs?.length > 0 && (
        <div className="grid md:grid-cols-3 gap-10 md:w-[90%] mx-auto mt-5">
          {blogs?.map((blog) => (
            <div key={blog?._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  className="h-40 w-full object-cover"
                  src={blog?.blog_thumbnail}
                  alt=""
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title">
                  {blog?.blog_title}
                  <div
                    className={`badge ${
                      blog?.status === "draft"
                        ? "bg-red-200"
                        : " badge-secondary"
                    }`}
                  >
                    {blog?.status}
                  </div>
                </h2>
                <p></p>
                {isAdmin?.admin === true && (
                  <div className="card-actions justify-start mt-5">
                    <button
                      onClick={() => handleBlogStatus(blog)}
                      className="btn btn-outline btn-sm"
                    >
                      {blog?.status === "draft" ? "Publish" : "Unpublish"}
                    </button>
                    <button
                      onClick={() => hanldeDelete(blog?._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete Blog
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
