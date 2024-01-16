import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen absolute top-0 z-0 left-0"
        style={{
          backgroundImage: "url(https://i.ibb.co/mXkgbw0/banner.jpg)",
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">
              {" "}
              The <span className="text-red-300">Smart</span> Way to <br /> Donate <span className="text-red-400">Blood</span>
              {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
    Hello world
  </span> */}
            </h1>
            <p className="mb-5">
              Bloodify is a web app that helps you donate blood and save lives.
              With Bloodify, you can easily register as a blood donor, find a
              blood center near you, and arrange your donation time. You can
              also browse blood requests, and volunteer to donate to someone who
              needs your blood type.
            </p>
            <div className="flex justify-center gap-5 relative">
              <Link to={'/register'}><button className="btn btn-primary">Join as Donor</button></Link>
              <Link to={'/donor-search'}><button className="btn btn-outline text-white">Search Donor</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen"></div>
    </div>
  );
};

export default Banner;
