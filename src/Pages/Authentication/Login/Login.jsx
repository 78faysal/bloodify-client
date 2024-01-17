import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";

const Login = () => {
    const {logInUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const from = location?.state?.from?.pathname || '/';

  const onSubmit = (data) => {
    setLoading(true);
    // console.log(data);

    // log in user
    logInUser(data.email, data.password)
    .then( async result => {
        const user = await result.user;
        if(user){
            setLoading(false);
            navigate(from, {replace: true})
            toast.success('Successfully logged in!')
        }
    })
    .catch(error => {
        setLoading(false);
        console.log(error.message);
        if(error.message === 'Firebase: Error (auth/invalid-credential).'){
            toast.error('Invalid credential! try again')
        }
        else{
            toast.error('Something is wrong')
        }
    })
  };

  // console.log(loading);
  if(loading){
    return <Spinner />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold">Join Us</h2>
        </div>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
                  required: "Password is required"
                })}
              />
            </div>
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
