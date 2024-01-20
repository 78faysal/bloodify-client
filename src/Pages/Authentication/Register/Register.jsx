import Select from "react-select";
import imageUpload from "../../../Hooks/imageUpload";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import useDivition from "../../../Hooks/useDivition";
import useDistricts from "../../../Hooks/useDistricts";
import useUpazilla from "../../../Hooks/useUpazilla";
import useBlood from "../../../Hooks/useBlood";
import { useState } from "react";

const Register = () => {
  const { createUser, updateUser } = useAuth();
  const [bloodOption, setBloodOption] = useState(null);
  const [divisionOption, setDivisionOption] = useState(null);
  const [districtOption, setDistrictOption] = useState(null);
  const [upazillaOption, setUpazillaOption] = useState(null);
  const { bloodOptions } = useBlood();
  const { divisionOptions } = useDivition();
  const { districtOptions } = useDistricts(divisionOption);
  const { upazillaOptions } = useUpazilla(districtOption);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const photoFile = data.photo[0];
    const photoData = await imageUpload(photoFile);
    const image = photoData.display_url;

    const user = {
      name: data.name,
      email: data.email,
      image: image,
      blood: bloodOption.value,
      division: divisionOption.value,
      district: districtOption.value,
      upazilla: upazillaOption.value,
      password: data.password,
      role: "donor",
      status: "active",
    };

    // create user
    createUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          axiosPublic.post("/users", user).then((res) => {
            if (res.data.insertedId) {
              setLoading(false);
              toast("Congrats! you become a donor", {
                icon: "👏",
              });
              navigate('/')
            }
          });
          updateUser(data.name, image).then(() => {});
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Already have account with this email");
        } else {
          toast.error("Something is wrong");
        }
      });
  };

  console.log(loading);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Join Us Now</h2>
        </div>
      </div>
      <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100 mx-auto">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              placeholder="Name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              {...register("photo")}
              type="file"
              placeholder="image"
              className="input input-bordered pt-2"
              required
            />
          </div>
          <div>
            <label className="label">Blood Group</label>
            <Select
              required
              className="w-full"
              onChange={setBloodOption}
              options={bloodOptions}
            />
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) => {
                    const password = watch("password");
                    return password === value || "passwords do not match";
                  },
                })}
                type="password"
                placeholder="Re-write password"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {errors.confirm_password && (
            <p className="text-red-500">{errors.confirm_password.message}</p>
          )}
          <div className="form-control mt-4">
            <button className="btn btn-primary">Register</button>
          </div>
          <div>
            <p className="text-center mt-3">
              Already have a account?{" "}
              <Link className="text-blue-500" to={"/login"}>
                Login now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
