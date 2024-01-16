import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Spinner from "../components/Spinner";

const PrivateRoute = ({children}) => {
    const {loading, user} = useAuth();
    const location = useLocation();

    if(loading){
        return <Spinner />
    }

    if(user){
        return children;
    }

    return <Navigate to={'/login'} state={{from: location}} replace />
};

export default PrivateRoute;