// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./component/Home";
import Header from "./component/Header";
// Authentication -> Admin
import AdminRegister from "./component/Authentication/ADMIN/AdminRegister";
import AdminLogin from "./component/Authentication/ADMIN/AdminLogin";
// Authentication -> User
import Register from "./component/Authentication/USER/Register";
import VerifyOtp from "./component/Authentication/USER/VerifyOtp";
import Login from "./component/Authentication/USER/Login";
// Restaurants
import NearbyRestaurants from "./component/Restaurant/NearbyRestaurants";
import AddRestaurant from "./component/Restaurant/AddRestaurant";
// Payment
import PaymentForm from "./component/Payment/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./component/Payment/CheckoutForm";
// 404
import NotFound from "./component/404";

const stripePromise = loadStripe(`pk_test_51PaMSDICMMYcgcItQ33Gnh2rsPpsX4ZX2aGN908aj7Q3tK4MFgVfBSVLBI6bwyyoDzcJ6JNVVQierKiFBgihapRN00P1fiCN2S`);
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Authentication */}
        <Route path="/register/user" element={<Register />} />
        <Route path="/register/verify" element={<VerifyOtp />} />
        <Route path="/login/user" element={<Login />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        {/* Restaurant */}
        <Route path="/restaurants/nearby" element={<NearbyRestaurants />} />
        <Route path="/restaurants/add" element={<AddRestaurant />} />
        {/* Payment */}
        <Route
          path="/payment/token"
          element={
            <ChakraProvider>
              <Elements stripe={stripePromise}>
                <PaymentForm username={"user1"} />
              </Elements>
            </ChakraProvider>
          }
        />
        <Route
          path="/payment/charge"
          element={
            <ChakraProvider>
              <Elements stripe={stripePromise}>
                <CheckoutForm username={"user1"} />
              </Elements>
            </ChakraProvider>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
