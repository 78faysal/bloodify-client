import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const {user} = useAuth();

    const navlinks = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/donation-requests'}>Donation Requests</Link></li>
        <li><Link to={'/blogs'}>Blogs</Link></li>

        {user ? <div className="md:hidden"><Link to={'/fundings'} className="btn">Fundings</Link>
          <Link to={'/dashboard'}>Dashboard</Link></div> : <div className="md:hidden">
            <Link to={'/login'} className="btn">Login</Link>
          <Link to={'/register'}>Register</Link>
          </div>}
    </>

  return (
    <div>
      <div className="navbar bg-base-200 md:px-28 fixed left-0 z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl ">🩸Bloodify</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navlinks}
          </ul>
        </div>
        <div className="navbar-end gap-3">
          {user ? <div className="max-sm:hidden"><Link to={'/fundings'} className="btn">Fundings</Link>
          <Link to={'/dashboard'}>Dashboard</Link></div> : <div className="max-sm:hidden">
            <Link to={'/login'} className="btn">Login</Link>
          <Link to={'/register'}>Register</Link>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
