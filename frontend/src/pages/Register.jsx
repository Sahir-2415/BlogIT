import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-2 text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Join BlogIT today.
        </p>

        <form className="space-y-5">

          <Input placeholder="Full Name" />

          <Input placeholder="Username" />

          <Input
            type="email"
            placeholder="Email Address"
          />

          <Input
            type="password"
            placeholder="Password"
          />

          <Input
            type="password"
            placeholder="Confirm Password"
          />

          <Button className="w-full">
            Register
          </Button>

        </form>

        <p className="text-center mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}