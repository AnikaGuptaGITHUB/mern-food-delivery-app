import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import "./LoginPopup.css";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login"); // "Login" or "Sign Up"
  const [data, setData] = useState({ name: "", email: "", password: "" });

  // Handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {
        if (!data.name || !data.email || !data.password) {
          toast.error("Please fill all fields!");
          return;
        }
        const response = await axios.post(`${url}/api/user/register`, data);
        if (response.data.success) {
          toast.success("Account created successfully!");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          toast.error(response.data.message);
        }
      } else {
        if (!data.email || !data.password) {
          toast.error("Please fill all fields!");
          return;
        }
        const response = await axios.post(`${url}/api/user/login`, {
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          toast.success("Logged in successfully!");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setShowLogin(false)}
          >
            X
          </span>
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-footer">
          {currState === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span
                style={{ color: "tomato", cursor: "pointer" }}
                onClick={() => setCurrState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                style={{ color: "tomato", cursor: "pointer" }}
                onClick={() => setCurrState("Login")}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
