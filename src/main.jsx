import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import 'jodit/build/jodit.min.css';

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <AuthProvider>
          <Toaster />
          <RouterProvider router={Routes} />
        </AuthProvider>
      </Elements>
    </QueryClientProvider>
  </React.StrictMode>
);
