import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import { LiaHourglassStartSolid } from "react-icons/lia";
import useAuth from "../../Hooks/useAuth";
import HTMLReactParser from "html-react-parser";

const Blogs = () => {
  const { loading } = useAuth();
  const { data: blogs, isPending } = useQuery({
    queryKey: ["blogs"],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/blogs?status=published");
      return data;
    },
  });

  //   console.log(blogs);
  return (
    <div className="pt-24">
      {isPending && (
        <div className="min-h-screen flex justify-center items-center">
          <LiaHourglassStartSolid className="text-2xl animate-spin" />
        </div>
      )}

      {blogs?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-5">All Blogs</h2>

          <div className="flex flex-col gap-10">
            {blogs?.map((blog) => (
              <div
                key={blog?._id}
                className="card lg:card-side bg-base-100 shadow-xl"
              >
                <figure className="md:w-1/4">
                  <img
                    className="h-full"
                    src={blog?.blog_thumbnail}
                    alt=""
                  />
                </figure>
                <div className="card-body md:w-3/4">
                  <h2 className="card-title">{blog?.blog_title}</h2>
                  <div>{HTMLReactParser(blog?.blog_content)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
