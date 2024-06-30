import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/login/user", {
        username,
        password,
      });
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  }

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <h1>Registration</h1>
          <form onSubmit={loginUser}>          
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
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
        <div className="mt-3">
          Don&apos;t have an account? <a href="register/user">Register</a>
        </div>
      </div>
    </>
  );
};

export default Login;
