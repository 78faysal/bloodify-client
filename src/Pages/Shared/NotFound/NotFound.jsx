import { useNavigate } from 'react-router-dom';
import img from '../../../assets/404.jpg';
import { IoIosArrowRoundBack } from "react-icons/io";


const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div>
            <img src={img} alt="" />
            <h2 className="text-2xl font-bold text-center mb-4">Page Not Found</h2>
            <h2 onClick={() => navigate(-1)} className="text-xl justify-center font-bold flex items-center gap-2 underline"><IoIosArrowRoundBack className='text-3xl' /> Go Back</h2>
            </div>
        </div>
    );
};

export default NotFound;