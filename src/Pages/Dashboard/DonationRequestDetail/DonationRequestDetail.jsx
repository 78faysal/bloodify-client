import { useLoaderData } from "react-router-dom";

const DonationRequestDetail = () => {
  const details = useLoaderData();
//   console.log(details);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">
        Donation Request Details
      </h2>

      <div className="md:flex justify-center md:gap-10 items-center max-sm:p-5 md:p-10 mt-5 bg-base-200">
        <div>
          <h3 className="text-lg">Recipient Details</h3>
          <p className="text-xl font-semibold">Name: {details?.recipient_name}</p>
          <p>Location: {details.district},{details.upazilla}</p>
          <p>Hospital: {details.hospital}</p>
          <p>Date: {details.date}</p>
          <p>Time: {details.time}</p>
        </div>
        <div className="divider divider-horizontal max-sm:divider md:h-60 my-auto"></div>
        <div>
          <h3 className="text-lg">Requester Details</h3>
          <p className="text-xl font-semibold">{details?.requester_name}</p>
          <p>{details?.requester_email}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetail;
