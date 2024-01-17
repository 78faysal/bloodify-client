import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { LiaHourglassStartSolid } from "react-icons/lia";
import useUpazilla from "../../../Hooks/useUpazilla";
import useDivition from "../../../Hooks/useDivition";
import Select from "react-select";
import { useState } from "react";
import useDistricts from "../../../Hooks/useDistricts";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
// import useBlood from "../../../Hooks/useBlood";

const RequestDonation = () => {
  const { user, loading } = useAuth();
  const [divisionOption, setDivisionOption] = useState(null);
  const [districtOption, setDistrictOption] = useState(null);
  const [upazillaOption, setUpazillaOption] = useState(null);
  const { divisionOptions } = useDivition();
  const { districtOptions } = useDistricts(divisionOption);
  const { upazillaOptions } = useUpazilla(districtOption);
  // const { bloodOptions } = useBlood();
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   const upazilla = useUpazilla("8");
  // console.log(upazillaOption);

  const onSubmit = async (data) => {
    setSubmitLoading(true);
    data.division = divisionOption.value;
    data.district = districtOption.value;
    data.upazilla = upazillaOption.value;
    data.status = "pending";

    axiosSecure.post("/donation_requests", data).then((res) => {
      if (res.data.insertedId) {
        reset();
        setSubmitLoading(false);
        toast.success("Successfully requested");
      }
    });
    // console.log(data);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Create Donation</h2>

      <form className="card-body " onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Requester Name</span>
            </label>
            <input
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered"
              {...register("requester_name")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Requester Email</span>
            </label>
            <input
              defaultValue={user?.email}
              readOnly
              {...register("requester_email")}
              type="email"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        <div className="md:flex gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Division</span>
            </label>
            <Select
              required
              className="w-full"
              {...register("division")}
              onChange={setDivisionOption}
              options={divisionOptions}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <Select
              required
              {...register("district")}
              onChange={setDistrictOption}
              options={districtOptions}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Upazilla</span>
            </label>
            <Select
              required
              {...register("upazilla")}
              onChange={setUpazillaOption}
              options={upazillaOptions}
            />
          </div>
        </div>
        <div className="md:flex gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              type="text"
              placeholder="recipient name"
              className="input input-bordered"
              {...register("recipient_name")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Hopital Name</span>
            </label>
            <input
              type="text"
              placeholder="where to donate blood."
              className="input input-bordered"
              {...register("hospital")}
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Full Address</span>
          </label>
          <input
            type="text"
            placeholder="Address line"
            className="input input-bordered"
            {...register("adresss")}
          />
        </div>
        <div className="md:flex gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Donation Date</span>
            </label>
            <input
              type="date"
              placeholder="Date"
              className="input input-bordered"
              {...register("date")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Donation Time</span>
            </label>
            <input
              type="text"
              placeholder="Time"
              className="input input-bordered"
              {...register("time")}
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            type="text"
            placeholder="Why you need blood"
            className="input input-bordered h-28 pt-3"
            {...register("description")}
          />
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div className="form-control mt-4">
          {/* <input type="submit" className="btn" value={` Update Profile`} /> */}
          <button className="btn" type="submit">
            {submitLoading && (
              <LiaHourglassStartSolid className="text-lg animate-spin" />
            )}
            Request Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestDonation;
