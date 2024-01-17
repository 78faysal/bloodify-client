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
    ],
  },
  {
    path: '/dashboard',
    errorElement: <NotFound />,
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'profile',
        element: <MyProfile />
      },
      {
        path: 'create-donation-request',
        element: <RequestDonation />
      },
      {
        path: 'update-donation-request/:id',
        loader: ({params}) => fetch(`http://localhost:5000/donation_requests/${params.id}`),
        element: <UpdateRequestDonation />
      },
      {
        path: 'my-donation-requests',
        element: <MyDonationRequests />
      }
    ]
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
