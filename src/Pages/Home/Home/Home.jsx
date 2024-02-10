import { useEffect } from "react";
import FAQ from "../../FAQ/FAQ";
import Featured from "../../Featured/Featured";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const myFunc = () => {
    console.log("show this");
    document.getElementById("my_modal_3").showModal();
  };
  useEffect(() => {
    setTimeout(myFunc, 5000);
  }, []);
  return (
    <div>
      <Banner />
      <ContactUs />
      <Featured />
      <FAQ />

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => }
      >
        open modal
      </button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-5xl bg-red-50">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="grid md:grid-cols-3 md:gap-10">
            <div className=" my-10 shadow-md py-8 pl-8 rounded-lg border-t border-l border-l-red-400 border-t-red-600 border-b-2 border-r-2 border-b-red-600 border-r-red-600 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="w-[35%] text-2xl md:text-4xl font-bold tracking-wider text-sky-900">
                  <sup className="text-2xl font-black">$</sup>10
                  <sub className="text-sm tracking-tight">/mo</sub>
                </h1>
                <div className=" px-4 md:px-10 py-4 md:py-5  w-[60%] bg-gradient-to-r from-red-300 to-red-600 rounded-tl-full rounded-bl-full">
                  <h3 className="text-white text-center font-semibold md:text-xl tracking-wider">
                    BASIC
                  </h3>
                </div>
              </div>
              <p className="text-sky-900 font-semibold">
                Enjoy limited use for your donation
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <IoCheckmarkDoneCircleOutline className="text-xl text-red-400" />
                  Get maximum 5 donors in 2 days
                </li>
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <MdOutlineCancel className="text-xl text-red-400" />
                  Hospital promotion
                </li>
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <MdOutlineCancel className="text-xl text-red-400" />
                  Premium Services
                </li>
              </ul>
              <div className="mr-8">
                <Link to={"/fundings"}>
                  <button className="py-4 w-full bg-gradient-to-r from-red-400 to-red-700 rounded-full uppercase text-white font-semibold text-lg tracking-wider">
                    get started
                  </button>
                </Link>
              </div>
            </div>
            <div className=" my-10 shadow-md py-8 pl-8 rounded-lg border-t border-l border-l-red-400 border-t-red-600 border-b-2 border-r-2 border-b-red-600 border-r-red-600 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="w-[35%] text-2xl md:text-4xl font-bold tracking-wider text-sky-900">
                  <sup className="text-2xl font-black">$</sup>30
                  <sub className="text-sm tracking-tight">/mo</sub>
                </h1>
                <div className=" px-4 md:px-6 py-4 md:py-5  w-[60%] bg-gradient-to-r from-red-300 to-red-600 rounded-tl-full rounded-bl-full">
                  <h3 className="text-white text-center font-semibold md:text-xl tracking-wider">
                    STANDARD
                  </h3>
                </div>
              </div>
              <p className="text-sky-900 font-semibold">
                Enjoy limited donation for your Hospital
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <IoCheckmarkDoneCircleOutline className="text-xl text-red-400" />
                  Get maximum 10 donors in 3 days
                </li>
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <IoCheckmarkDoneCircleOutline className="text-xl text-red-400" />
                  Hospital Promotions
                </li>
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <MdOutlineCancel className="text-xl text-red-400" />
                  Premium Services
                </li>
              </ul>
              <div className="mr-8">
                <Link to={"/fundings"}>
                  <button className="py-4 w-full bg-gradient-to-r from-red-400 to-red-700 rounded-full uppercase text-white font-semibold text-lg tracking-wider">
                    get started
                  </button>
                </Link>
              </div>
            </div>
            <div className=" my-10 shadow-md py-8 pl-8 rounded-lg border-t border-l border-l-red-400 border-t-red-600 border-b-2 border-r-2 border-b-red-600 border-r-red-600 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="w-[35%] text-2xl md:text-4xl font-bold tracking-wider text-sky-900">
                  <sup className="text-2xl font-black">$</sup>80
                  <sub className="text-sm tracking-tight">/mo</sub>
                </h1>
                <div className=" px-4 md:px-7 py-4 md:py-5  w-[60%] bg-gradient-to-r from-red-300 to-red-600 rounded-tl-full rounded-bl-full">
                  <h3 className="text-white text-center font-semibold md:text-xl tracking-wider">
                    PREMIUM
                  </h3>
                </div>
              </div>
              <p className="text-sky-900 font-semibold">
                Get limitless donors for your Hospital
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <IoCheckmarkDoneCircleOutline className="text-xl text-red-400" />
                  Unlimited donors for 10 days for your Hospital
                </li>
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <IoCheckmarkDoneCircleOutline className="text-xl text-red-400" />
                  Hopital Promotions
                </li>
                <li className="flex items-center gap-2 text-sm text-sky-900 font-semibold">
                  <IoCheckmarkDoneCircleOutline className="text-xl text-red-400" />
                  Premium Package & Services
                </li>
              </ul>
              <div className="mr-8">
                <Link to={"/fundings"}>
                  <button className="py-4 w-full bg-gradient-to-r from-red-400 to-red-700 rounded-full uppercase text-white font-semibold text-lg tracking-wider">
                    get started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
