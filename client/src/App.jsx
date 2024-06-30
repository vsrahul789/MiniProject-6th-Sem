import Register from "./component/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyOtp from "./component/VerifyOtp";
import Login from "./component/Login";
import Home from "./component/Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/user" element={<Register />} />
          <Route path="/register/verify" element={<VerifyOtp />} />
          <Route path="/login/user" element={<Login />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
