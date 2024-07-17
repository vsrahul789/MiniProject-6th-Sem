// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Divider } from "@chakra-ui/react";
import Home from "./component/Home";
import Header from "./component/Header";
// Authentication -> Admin
import AdminRegister from "./component/Authentication/ADMIN/AdminRegister";
import AdminLogin from "./component/Authentication/ADMIN/AdminLogin";
// Authentication -> User
import Register from "./component/Authentication/USER/Register";
import VerifyOtp from "./component/Authentication/USER/VerifyOtp";
import Login from "./component/Authentication/USER/Login";
import UpdateUser from "./component/Authentication/USER/UpdateUser";
// Restaurants
// Restaurants, Menu
import NearbyRestaurants from "./component/Restaurant/NearbyRestaurants";
import AddRestaurant from "./component/Restaurant/AddRestaurant";
import RestaurantList from "./component/Restaurant/RestaurantList";
import RestaurantSelection from "./component/Restaurant/RestaurantSelection";
import AddMenuItem from "./component/Restaurant/MenuItems/AddMenuItems";
import GetRestaurantId from "./component/Restaurant/GetRestaurantId";
import UpdateRestaurantForm from "./component/Restaurant/UpdateRestaurantForm";


// Booking
import BookingForm from "./component/Booking/BookingForm";
import AddingSlots from "./component/Booking/BookingSlot/AddingSlots";
// Payment
import PaymentForm from "./component/Payment/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./component/Payment/CheckoutForm";
// 404
import NotFound from "./component/404";
import AddingCartItems from "./component/Restaurant/CartItems/AddingCartItems";
import Footer from "./component/Footer";

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
        <Route path="/update/user" element={<UpdateUser />} />
        
        {/* Admin */}
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        {/* Restaurant */}
        <Route path="/restaurants/nearby" element={<NearbyRestaurants />} />
        <Route path="/restaurants/add" element={<AddRestaurant />} />
        <Route path="/restaurants/list" element={<RestaurantList />} />
        <Route path="/restaurants/select/:restaurantId" element={<RestaurantSelection />} />
        <Route path="/restaurants/getId" element={<GetRestaurantId />} />
        <Route path="/restaurants/update/:restaurantId" element={<UpdateRestaurantForm />} />
        {/* Menu Items */}
        <Route path="/restaurants/addMenuItem" element={<AddMenuItem />} />

        {/* Booking */}
        <Route path="/booking/slot" element={<AddingSlots />} />
        <Route path="/booking/restaurants/select" element={<RestaurantSelection />} />
        <Route path="/booking/:restaurantId/add" element={<BookingForm />} />
        {/* Cart */}
        <Route path="/cart/addItems" element={<AddingCartItems />} />

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
      <Divider borderColor="gray.600" />

      <Footer />
    </Router>
  )
};
export default App;