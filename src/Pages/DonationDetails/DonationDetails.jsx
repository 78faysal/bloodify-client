import { useState } from "react";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DonationDetails = () => {
  const details = useLoaderData();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const formData = {
      donor_name: name,
      donor_email: email,
      status: "inprogress",
    };
    axiosSecure
      .patch(`/donation_requests/${details?._id}`, formData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setModalOpen(false);
          toast.success("Successfull! Please get ready for the donation");
          setSubmitLoading(false);
          navigate(-1)
        }
      });

    setSubmitLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-2xl font-bold text-center">
          Donation Request Details
        </h2>

        <div className=" max-sm:p-5 md:p-10 mt-5 bg-base-200">
          <div className="md:flex justify-center md:gap-10 items-center">
            <div>
              <h3 className="text-lg text-center">Recipient Details</h3>
              <div className="divider"></div>
              <p className="text-xl font-semibold">
                Name: {details?.recipient_name}
              </p>
              <p>
                Location: {details.district},{details.upazilla}
              </p>
              <p>Hospital: {details.hospital}</p>
              <p>Date: {details.date}</p>
              <p>Time: {details.time}</p>
              <p>Message: {details.description}</p>
            </div>
            <div className="divider divider-horizontal max-sm:divider md:h-60 my-auto"></div>
            <div>
              <h3 className="text-lg text-center">Requester Details</h3>
              <div className="divider my-2"></div>
              <p className="text-xl font-semibold">{details?.requester_name}</p>
              <p>{details?.requester_email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              handleModalOpen(details), setModalOpen(true);
            }}
            className="btn w-full btn-outline mt-5"
          >
            Donate Now
          </button>
        </div>
      </div>

      <dialog id="my_modal_3" open={modalOpen} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg"></h3>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered"
                name="name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                defaultValue={user?.email}
                readOnly
                name="email"
                type="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              {/* <input type="submit" className="btn" value={` Update Profile`} /> */}
              <button className={`btn ${details?.requester_email === user?.email && 'hidden'}`} type="submit">
                {submitLoading && (
                  <LiaHourglassStartSolid className={`text-lg animate-spin`} />
                )}
                Donate Now
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DonationDetails;
