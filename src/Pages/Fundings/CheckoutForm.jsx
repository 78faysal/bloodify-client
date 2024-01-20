import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutForm = ({ refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  // const [amount, setAmount] = useState(10);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: 50 }).then((res) => {
      console.log(res.data);
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [ axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // setAmount(event.target.amount.value);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("Payment Method", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
    }

    console.log("payment intent", paymentIntent);
    if (paymentIntent.id) {
      // send to database
    }

    if (paymentIntent.status === "succeeded") {
      //save payment info to the server
      // update status on db
      const paymentInfo = {
        transactionId: paymentIntent.id,
        date: new Date(),
        name: user?.displayName,
        email: user?.email,
        amount: paymentIntent.amount,
      };

      axiosSecure.post("/payments", paymentInfo).then((res) => {
        if (res.data.insertedId) {
          refetch();
          toast.success("Thanks for your donation");
        }
      });

      //   try {
      //
      //   } catch (erro) {
      //     console.log(error);
      //   }

      setProcessing(false);
    }
  };

  // console.log(amount);

  return (
    <form onSubmit={handleSubmit} className="card-body mt-5">
      {/* <div>
        <input
          // onChange={setAmount}
          name="amount"
          type="number"
          min="1"
          placeholder="Amount"
          className="input input-bordered border-white rounded-none text-white bg-transparent w-full"
        />
      </div> */}
      <CardElement
        className="border py-4 px-2"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#ffff",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={!stripe || !clientSecret || processing}
      >
        Donate 100$
      </button>
    </form>
  );
};

export default CheckoutForm;
