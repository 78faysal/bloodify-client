// import { useForm } from "react-hook-form";
import Select from "react-select";
import useBlood from "../../Hooks/useBlood";
import useDistricts from "../../Hooks/useDistricts";
import useUpazilla from "../../Hooks/useUpazilla";
import useDivition from "../../Hooks/useDivition";
import { useState } from "react";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { LiaHourglassStartSolid } from "react-icons/lia";

const DonorSearch = () => {
  // const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [bloodOption, setBloodOption] = useState(null);
  const [divisionOption, setDivisionOption] = useState(null);
  const [districtOption, setDistrictOption] = useState(null);
  const [upazillaOption, setUpazillaOption] = useState(null);
  const { bloodOptions } = useBlood();
  const { divisionOptions } = useDivition();
  const { districtOptions } = useDistricts(divisionOption);
  const { upazillaOptions } = useUpazilla(districtOption);
  const [donors, setDonors] = useState([]);
  const [donorLoading, setDonorLoading] = useState(false);

  // console.log(bloodOption?.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDonorLoading(true);

    const bloodValue = bloodOption.value.trim();

    axiosPublic
      .get(
        `/users-donor?blood=${encodeURIComponent(bloodValue)}&&district=${
          districtOption?.value
        }`
      )
      .then((res) => {
        console.log(res.data);
        setDonors(res.data);
        setDonorLoading(false);
      })
      .catch((error) => {
        setDonorLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="pt-24">
      <p className="text-center">Get a donor my filter</p>
      <h2 className="text-2xl font-bold text-center mb-5">Search a donor</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 items-end justify-center">
          <div>
            <label className="label">Blood</label>
            <Select
              required
              className="w-full"
              onChange={setBloodOption}
              options={bloodOptions}
            />
          </div>
          <div>
            <label className="label">Division</label>
            <Select
              required
              className="w-full"
              onChange={setDivisionOption}
              options={divisionOptions}
            />
          </div>
          <div>
            <label className="label">District</label>
            <Select
              required
              className="w-full"
              onChange={setDistrictOption}
              options={districtOptions}
            />
          </div>
          <div>
            <label className="label">Upazilla</label>
            <Select
              required
              className="w-full"
              onChange={setUpazillaOption}
              options={upazillaOptions}
            />
          </div>
        </div>
        <div className=" flex justify-center mt-2">
          <input className="btn" type="submit" value="Search" />
        </div>
      </form>

      {donorLoading && (
        <div className="min-h-screen flex justify-center items-center">
          <LiaHourglassStartSolid className="text-2xl animate-spin" />
        </div>
      )}

      {donors?.length < 1 && <div className="my-20">
          <h2 className="text-2xl font-bold text-center">No Donor Avaiable</h2>
        </div>}

      {donors?.length > 0 && (
        <div className="grid md:grid-cols-3 gap-10 my-20">
          {donors?.map((donor) => (
            <div key={donor?._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  className="w-full object-cover"
                  src={donor?.image}
                  alt=""
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title">{donor?.name}</h2>
                <p>Email: {donor?.email}</p>
                <p>Blood: {donor?.blood}</p>
                <p>District: {donor?.district}</p>
                <p>Upazilla: {donor?.upazilla}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorSearch;
