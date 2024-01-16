import axios from "axios";
import { useEffect, useState } from "react";

const useDistricts = (divisionOption) => {
  const [districtOption, setDistrictOption] = useState(null);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [loading, setLoading] = useState(false);

    // console.log(divisionOption);

  useEffect(() => {
    setLoading(true)
    axios.get("/districts.json").then((res) => {
      const districtsOfDivition = res.data.filter(
        (district) => district.division_name === divisionOption?.value
      );
      setDistrictOptions(districtsOfDivition);
    });
    setLoading(false);
  }, [divisionOption]);

  return {
    districtOptions,
    // districtOption,
    // loading,
    // setDistrictOption
  };
};

export default useDistricts;
