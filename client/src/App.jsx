import Register from "./component/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyOtp from "./component/VerifyOtp";
import Login from "./component/Login";
import Home from "./component/Home";
import Header from "./component/Header";
import NotFound from "./component/404";
import NearbyRestaurants from "./component/NearbyRestaurants"; // Import the NearbyRestaurants component

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/user" element={<Register />} />
          <Route path="/register/verify" element={<VerifyOtp />} />
          <Route path="/login/user" element={<Login />} />
          <Route path="/restaurants/nearby" element={<NearbyRestaurants />} /> {/* Add this route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
