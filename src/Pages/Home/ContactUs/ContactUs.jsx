import { IoLocationOutline } from "react-icons/io5";
import { MdCallMissedOutgoing } from "react-icons/md";
import { LuMailPlus } from "react-icons/lu";



const ContactUs = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 items-center justify-center gap-10 my-20">
        <div className="space-y-3">
            <h1 className="text-3xl font-bold">We are Here to Help</h1>
            <p>If you have any questions, feedback, or suggestions, please do not hesitate to contact us.</p>

            <div>
                <p className="flex items-center gap-2"><IoLocationOutline className="text-lg" /> Mirpur-10, Dhaka, Bangladesh</p>
                <p className="flex items-center gap-2"><MdCallMissedOutgoing className="text-lg" />+09 2452 4521</p>
                <p className="flex items-center gap-2"><LuMailPlus className="text-lg" />bloodify.info@gmail.com</p>
            </div>
        </div>

        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                type="text"
                placeholder="Your Message"
                className="input input-bordered h-28 pt-3"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
