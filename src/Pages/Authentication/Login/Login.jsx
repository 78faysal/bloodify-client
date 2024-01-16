import { Link } from "react-router-dom";

const Login = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold">Join Us</h2>
        </div>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
        <form className="card-body" onSubmit={handleFormSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <div>
            <p className="text-center mt-3">
              New Here?{" "}
              <Link className="text-blue-500" to={"/register"}>
                Register now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
