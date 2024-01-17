import { Link, Outlet } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCreateOutline, IoHomeOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import useAdmin from "../Hooks/useAdmin";



const DashboardLayout = () => {
  const { logOut } = useAuth();
  const [isAdmin] = useAdmin();

  console.log(isAdmin);

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("Logged Out");
    });
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-8">
          <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
            <CgMenuLeft />
          </label>

          <Outlet />

          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-5 w-80 min-h-full bg-base-200 text-base-content flex justify-between">
            {/* Sidebar content here */}
            <div>
              <h2 className="text-xl font-bold text-center py-4">🩸Bloodify</h2>
              <li>
                <Link to={"/dashboard"}><LuLayoutDashboard className="text-lg" /> Dashboard Home</Link>
              </li>
              <li>
                <Link to={"/dashboard/create-donation-request"}><IoCreateOutline className="text-lg" />Request Donation</Link>
              </li>
              <li>
                <Link to={"/dashboard/my-donation-requests"}><CiCircleList className="text-lg" />My Donation Requests</Link>
              </li>
              <div className="divider my-2"></div>
              <li>
                <Link to={"/"}><IoHomeOutline className="text-lg" />Home</Link>
              </li>
            </div>

            <div className="font-semibold">
              <li>
                <Link to={"/dashboard/profile"}><CgProfile className="text-lg" /> My Profile </Link>
              </li>
              <li>
                <p onClick={handleLogOut}> <MdLogout className="text-lg" /> LogOut</p>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
