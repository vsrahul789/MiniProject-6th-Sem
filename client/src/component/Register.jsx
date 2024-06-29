import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(Number);
  const [preferredCuisine, setPreferredCuisine] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
        age,
        preferredCuisine,
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
          <h1>Registration</h1>
          <form>
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

            <button className="btn btn-success" onClick={registerUser}>
              Register
            </button>
          </form>
        </div>
        <div className="mt-3">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </>
  );
};

export default Register;
