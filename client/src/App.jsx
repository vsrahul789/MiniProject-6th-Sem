import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Header from "./component/Header";
// Authentication->Admin
import AdminRegister from "./component/Authentication/ADMIN/AdminRegister";
import AdminLogin from "./component/Authentication/ADMIN/AdminLogin";


// Authentication->User
import Register from "./component/Authentication/USER/Register";
import VerifyOtp from "./component/Authentication/USER/VerifyOtp";
import Login from "./component/Authentication/USER/Login";

// Restaurants
import NearbyRestaurants from "./component/Restaurant/NearbyRestaurants"; // Import the NearbyRestaurants component
import AddRestaurant from "./component/Restaurant/AddRestaurant";

import NotFound from "./component/404";

const App = () => {
  return (
    <>
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
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
