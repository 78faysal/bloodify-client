import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import NotFound from "../Pages/Shared/NotFound/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import RequestDonation from "../Pages/Dashboard/RequestDonation/RequestDonation";
import UpdateRequestDonation from "../Pages/Dashboard/UpdateRequestDonation/UpdateRequestDonation";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import DonationRequestDetail from "../Pages/Dashboard/DonationRequestDetail/DonationRequestDetail";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AllBloodRequests from "../Pages/Dashboard/AllBloodRequests/AllBloodRequests";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/Dashboard/AddBlog/AddBlog";
import BloodDonationRequests from "../Pages/BloodDonationRequests/BloodDonationRequests";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import DonorSearch from "../Pages/DonorSearch/DonorSearch";
import Blogs from "../Pages/Blogs/Blogs";
import Fundings from "../Pages/Fundings/Fundings";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/donation-requests",
        element: <BloodDonationRequests />,
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/donor-search",
        element: <DonorSearch />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/fundings",
        element: <Fundings />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <NotFound />,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "create-donation-request",
        element: <RequestDonation />,
      },
      {
        path: "update-donation-request/:id",
        loader: ({ params }) =>
          fetch(
            `https://bloodify-server.vercel.app/donation_requests/${params.id}`
          ),
        element: <UpdateRequestDonation />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "donation-request-detail/:id",
        loader: ({ params }) =>
          fetch(
            `https://bloodify-server.vercel.app/donation_requests/${params.id}`
          ),
        element: <DonationRequestDetail />,
      },

      // admin dashboard routes
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-requests",
        element: (
          <AdminRoute>
            <AllBloodRequests />
          </AdminRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminRoute>
            <ContentManagement />
          </AdminRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <AdminRoute>
            <AddBlog />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default Routes;
