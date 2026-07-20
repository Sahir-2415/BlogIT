import { Link, NavLink } from "react-router-dom";
// import { PenSquare } from "lucide-react";

export default function Navbar() {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-slate-700 hover:text-blue-600 transition";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
<span className="text-2xl">📝</span>
          <span className="text-2xl font-bold text-slate-800">
            BlogIT
          </span>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex gap-8">

          <NavLink
            to="/"
            className={navLinkStyle}
          >
            Home
          </NavLink>

          <NavLink
            to="/"
            className={navLinkStyle}
          >
            Categories
          </NavLink>

          <NavLink
            to="/"
            className={navLinkStyle}
          >
            Search
          </NavLink>

        </nav>

        {/* Right Side */}
        <div className="flex gap-3">

          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </header>
  );
}