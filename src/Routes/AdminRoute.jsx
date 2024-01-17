import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Spinner from "../components/Spinner";

const AdminRoute = ({children}) => {
    const {loading, user} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <Spinner />
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to={'/login'} state={{from: location}} replace />
};

export default AdminRoute;