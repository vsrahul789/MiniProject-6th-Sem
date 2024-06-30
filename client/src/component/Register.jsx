import axios from "axios";
import { useState, useNavigate } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [preferredCuisine, setPreferredCuisine] = useState("");
  const navigate = useNavigate;

  async function registerUser(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register/user", {
        username,
        email,
        password,
        age: Number(age), // Convert age to number
        preferredCuisine,
      });
      alert("Verification OTP Sent to your email!");
      navigate("/register/verify");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <h1>Registration</h1>
          <form onSubmit={registerUser}> {/* Add onSubmit handler here */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Age"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Preferred Cuisine"
                className="form-control"
                value={preferredCuisine}
                onChange={(e) => setPreferredCuisine(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </form>
        </div>
        <div className="mt-3">
          Already have an account? <a href="/login/user">Login</a>
        </div>
      </div>
    </>
  );
};

export default Register;
