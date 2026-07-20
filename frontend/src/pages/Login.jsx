import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary login (no backend)
    if (formData.email && formData.password) {
      navigate("/dashboard");
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Login to continue.
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="text-right">
            <Link
              to="#"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="text-center mt-8">
          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}