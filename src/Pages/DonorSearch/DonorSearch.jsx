// import { useForm } from "react-hook-form";
import Select from "react-select";
import useBlood from "../../Hooks/useBlood";
import useDistricts from "../../Hooks/useDistricts";
import useUpazilla from "../../Hooks/useUpazilla";
import useDivition from "../../Hooks/useDivition";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DonorSearch = () => {
  const axiosSecure = useAxiosSecure();
  const [bloodOption, setBloodOption] = useState(null);
  const [divisionOption, setDivisionOption] = useState(null);
  const [districtOption, setDistrictOption] = useState(null);
  const [upazillaOption, setUpazillaOption] = useState(null);
  const { bloodOptions } = useBlood();
  const { divisionOptions } = useDivition();
  const { districtOptions } = useDistricts(divisionOption);
  const { upazillaOptions } = useUpazilla(districtOption);

  console.log(bloodOption?.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { blood: bloodOption.value, district: districtOption.value };
    axiosSecure.get(`/users?query=${JSON.stringify(data)}`).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="pt-24">
      <p className="text-center">Get a donor my filter</p>
      <h2 className="text-2xl font-bold text-center mb-5">Search a donor</h2>

      <form className="" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default DonorSearch;
