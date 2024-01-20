import FAQ from "../../FAQ/FAQ";
import Featured from "../../Featured/Featured";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";

const Home = () => {
    return (
        <div>
            <Banner />
            <ContactUs />
            <Featured />
            <FAQ />
        </div>
    );
};

export default Home;