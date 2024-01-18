import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
// import HTMLReactParser from "html-react-parser";
import { useForm } from "react-hook-form";
import { LiaHourglassStartSolid } from "react-icons/lia";
import imageUpload from "../../../Hooks/imageUpload";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  //   console.log(HTMLReactParser(content));

  const onSubmit = async (data) => {
    setSubmitLoading(true);
    const photoFile = data.blog_thumbnail[0];
    const photoData = await imageUpload(photoFile);
    data.blog_thumbnail = photoData.display_url;
    data.blog_content = content;
    data.status = 'draft';

    const { data: blog } = await axiosSecure.post("/blogs", data);
    // console.log(blog);
    if (blog.insertedId) {
      reset();
      toast.success("Blog added Successfully");
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-4">Add a Blog</h2>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Blog Title</span>
          </label>
          <input
            placeholder="Blog Title"
            className="input input-bordered"
            {...register("blog_title")}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Blog Thumbnail</span>
          </label>
          <input
            type="file"
            className="input input-bordered pt-2"
            {...register("blog_thumbnail")}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Blog Content</span>
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            //   config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={() => {}}
          />
        </div>
        {/* <div>
          <JoditEditor
            ref={editor}
            value={content}
            //   config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={() => {}}
          />
        </div> */}

        <button className="btn w-full" type="submit">
          {submitLoading && (
            <LiaHourglassStartSolid className="text-lg animate-spin" />
          )}
          Upload Blog
        </button>
      </form>

      {/* <div>{content}</div> */}
    </div>
  );
};

export default AddBlog;
