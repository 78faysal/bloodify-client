import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <div className="max-sm:px-5"><Outlet /></div>
            <Footer />
        </div>
    );
};

export default MainLayout;