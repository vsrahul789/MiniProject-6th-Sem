import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [preferredCuisine, setPreferredCuisine] = useState("VEGETARIAN");
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    if (age <= 10) {
      alert("Age must be above 10.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/auth/register/user", {
        username,
        email,
        password,
        age: Number(age), // Convert age to number
        preferredCuisine,
      });
      alert("Verification OTP Sent to your email!");
      navigate('/verify'); // Navigate to verification page
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="tabs">
          <button className="tab active">Signup</button>
          <button className="tab">Login</button>
        </div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              value={preferredCuisine}
              onChange={(e) => setPreferredCuisine(e.target.value)}
              required
            >
              <option value="VEGETARIAN">VEGETARIAN</option>
              <option value="NON_VEGETARIAN">NON_VEGETARIAN</option>
            </select>
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
      </div>
      <div className="footer">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
