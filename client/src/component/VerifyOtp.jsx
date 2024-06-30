import axios from "axios";
import React from "react";

const VerifyOtp = () => {
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");

  async function verify(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/verify", {
        email,
        otp,
      });
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <h1>OTP Verification</h1>
          <form onSubmit={verify}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="OTP"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </form>
          <button type="submit" onClick={verify} className="btn btn-success">
            Verify
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
