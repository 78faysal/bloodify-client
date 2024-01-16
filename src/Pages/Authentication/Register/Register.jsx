import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import imageUpload from "../../../Hooks/imageUpload";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const [bloodOption, setBloodOption] = useState(null);
  const [divisionOption, setDivisionOption] = useState(null);
  const [districtOption, setDistrictOption] = useState(null);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get("districts.json").then((res) => {
      const districtsOfDivition = res.data.filter(
        (district) => district.division_name === divisionOption?.value
      );
      setDistrictOptions(districtsOfDivition);
    });
  }, [divisionOption]);

  console.log(districtOptions);

  const bloodOptions = [
    { value: "o+", label: "O+" },
    { value: "o-", label: "O-" },
    { value: "a+", label: "A+" },
    { value: "a-", label: "A-" },
    { value: "b+", label: "B+" },
    { value: "b-", label: "B-" },
    { value: "ab+", label: "AB+" },
    { value: "ab-", label: "AB-" },
  ];

  const divisionOptions = [
    {
      value: "Chattagram",
      label: "Chattagram",
    },
    {
      value: "Rajshahi",
      label: "Rajshahi",
    },
    {
      value: "Khulna",
      label: "Khulna",
    },
    {
      value: "Barisal",
      label: "Barisal",
    },
    {
      value: "Sylhet",
      label: "Sylhet",
    },
    {
      value: "Dhaka",
      label: "Dhaka",
    },
    {
      value: "Rangpur",
      label: "Rangpur",
    },
    {
      value: "Mymensingh",
      label: "Mymensingh",
    },
  ];

  const onSubmit = async (data) => {
    // e.preventDefault();
    console.log(data.password, data.confirm_password);

    // const photoFile = data.photo[0];
    // const photoData = await imageUpload(photoFile);
    // const avater = photoData.display_url;

    
  };

  //   console.log(selectedBloodOption, divisionOption, districtOption);
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
          <div className="md:flex gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <Select onChange={setBloodOption} options={bloodOptions} />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Division</span>
              </label>
              <Select
                className="w-full"
                onChange={setDivisionOption}
                options={divisionOptions}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <Select onChange={setDistrictOption} options={districtOptions} />
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
