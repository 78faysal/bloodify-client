import axios from "axios";
import { useEffect, useState } from "react";

const useUpazilla = (districtOption) => {
  // const [upazillaOption, setUpazillaOption] = useState(null);
  const [upazillaOptions, setUpazillaOptions] = useState([]);
  // const [loading, setLoading] = useState(false);
  //   console.log(districtOption);
  useEffect(() => {
    // setLoading(true);
    axios.get("/upazilla.json").then((res) => {
      const upazillaOfDistrict = res.data.filter(
        (upazilla) => upazilla.district_name === districtOption?.id
      );
      // console.log(upazillaOfDistrict);
      setUpazillaOptions(upazillaOfDistrict);
    });
    // setLoading(false);
  }, [districtOption]);

  return { upazillaOptions };
};

export default useUpazilla;
