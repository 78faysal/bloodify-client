import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { LiaHourglassStartSolid } from "react-icons/lia";
import useUpazilla from "../../../Hooks/useUpazilla";
import useDivition from "../../../Hooks/useDivition";
import Select from "react-select";
import { useState } from "react";
import useDistricts from "../../../Hooks/useDistricts";

const RequestDonation = () => {
  const [divisionOption, setDivisionOption] = useState(null);
  const [districtOption, setDistrictOption] = useState(null);
  const [upazillaOption, setUpazillaOption] = useState(null);
  const { user, loading } = useAuth();
  const { divisionOptions } = useDivition();
  const { districtOptions } = useDistricts(divisionOption);
  const {upazillaOptions} = useUpazilla(districtOption);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const upazilla = useUpazilla("8");
  console.log(upazillaOption);

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Create Donation</h2>

      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
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
              onChange={setUpazillaOption}
              options={upazillaOptions}
            />
          </div>
        </div>
        <div className="md:flex gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div className="form-control mt-4">
          {/* <input type="submit" className="btn" value={` Update Profile`} /> */}
          <button className="btn" type="submit">
            <LiaHourglassStartSolid
              className={`text-lg ${loading ? "animate-spin" : ""}`}
            />{" "}
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestDonation;
