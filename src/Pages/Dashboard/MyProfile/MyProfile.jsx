import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { BiDonateBlood } from "react-icons/bi";
import { LiaShareAltSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import imageUpload from "../../../Hooks/imageUpload";
import toast from "react-hot-toast";
import Select from "react-select";
import { LiaHourglassStartSolid } from "react-icons/lia";


const MyProfile = () => {
  const { user, updateUser, updatePass } = useAuth();
  const [modalData, setModalData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: profile, isPending, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      //   console.log(res.data);
      return res.data;
    },
  });

  const [bloodOption, setBloodOption] = useState(null);
  const [divisionOption, setDivisionOption] = useState(null);
  const [districtOption, setDistrictOption] = useState(null);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      const districtsOfDivition = res.data.filter(
        (district) => district.division_name === divisionOption?.value
      );
      setDistrictOptions(districtsOfDivition);
    });
  }, [divisionOption]);

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

    // console.log(profile);

  const handleModalOpen = (profileInfo) => {
    document.getElementById("my_modal_3").showModal();
    setModalData(profileInfo);
  };


  const onSubmit = async (data) => {
    setLoading(true);

    const photoFile = data.photo[0];
    const photoData = await imageUpload(photoFile);
    const image = photoData.display_url;

    const updatedData = {
      name: data?.name,
      email: data?.email,
      image: image,
      blood: bloodOption.value,
      division: districtOption.division_name,
      district: districtOption.value,
      password: data.password,
    };
    console.log(updatedData);

    // update user
    axiosPublic
      .patch(`/users/${user?.email}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setLoading(false);
          refetch();
          reset();
          setModalOpen(false);
          toast.success("Congrats! your profile updated");
        }
        updateUser(data.name, image).then(() => {});
        updatePass(data.password).then(() => {});
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something is wrong");
      });
  };

//   console.log(modalData);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-5">Profile Info</h2>

      {isPending && (
        <div className="min-h-screen flex justify-center items-center">
          <LiaHourglassStartSolid className="text-2xl animate-spin" />
        </div>
      )}

      <div className="md:flex justify-center items-center max-w-3xl bg-base-200 p-10 rounded-xl gap-10 mx-auto rounded my-10">
        <figure>
          <img
            src={profile?.image}
            alt=""
            className={`w-40 mx-auto h-46 avatar object-cover rounded-full ring ring-primary ${
              profile?.status === "active" ? "online" : "offline"
            }`}
          />
        </figure>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{profile?.name}</h2>
          <p>{profile?.email}</p>
          <p className="flex items-center gap-2">
            <BiDonateBlood />
            {profile?.blood}{" "}
          </p>
          <p className="flex items-center gap-2">
            <LiaShareAltSolid />
            {profile?.division}
          </p>
          <div className="flex items-center gap-2">
            <IoLocationOutline />
            {profile?.district}
          </div>
          <button
            onClick={() => {handleModalOpen(profile), setModalOpen(true)}}
            className="btn btn-outline btn-sm"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" open={modalOpen} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg"></h3>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={modalData?.name}
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
                defaultValue={modalData?.email}
                readOnly
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
                defaultValue={modalData?.image}
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
                <Select
                  defaultValue={modalData?.blood}
                  required
                  onChange={setBloodOption}
                  options={bloodOptions}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Division</span>
                </label>
                <Select
                  defaultValue={modalData?.division}
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
                  defaultValue={modalData?.district}
                  required
                  onChange={setDistrictOption}
                  options={districtOptions}
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
              <button className="btn" type="submit"><LiaHourglassStartSolid className={`text-lg ${loading? 'animate-spin' : ''}`} /> Update Profile</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;
