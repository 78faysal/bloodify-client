import { useQuery } from "@tanstack/react-query";
import banner from "../../assets/funding_img.jpg";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Fundings = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allDonations, isPending, refetch } = useQuery({
    queryKey: ["donatios"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments");
      return data;
    },
  });
  return (
    <div>
      <div
        className="hero min-h-screen absolute left-0 top-0"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">Donate Now</h1>
            <p className="mb-5">
              Let us change the world with a simple act of kindness. Your one
              donation can save a whole life.
            </p>
            <div>
              <CheckoutForm refetch={refetch} />
            </div>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen"></div>

      <div className="md:mx-20 my-20">
        <h2 className="text-2xl font-bold text-center mb-8">All Fundings</h2>
        {allDonations?.length > 0 && !isPending && (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Donor Email</th>
                  <th>Donation Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {allDonations?.map((donation) => (
                  <tr key={donation?._id}>
                    <th>{donation?.name}</th>
                    <td>{donation?.email}</td>
                    <td>{donation?.date}</td>
                    <td>{donation?.amount}$</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fundings;
