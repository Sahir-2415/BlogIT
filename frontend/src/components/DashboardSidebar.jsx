import { NavLink } from "react-router-dom";

export default function DashboardSidebar() {

  const navClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-slate-200 text-slate-700"
    }`;

  return (
    <aside className="w-72 bg-white shadow-lg p-6">

      <h1 className="text-3xl font-bold text-blue-600 mb-10">
        BlogIT
      </h1>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          end
          className={navClass}
        >
          Dashboard
        </NavLink>
        
        <NavLink
        to="/dashboard/profile"
        className={navClass}
    >
        Profile
        </NavLink>

        <NavLink
          to="/dashboard/create"
          className={navClass}
        >
          Create Post
        </NavLink>

        <NavLink
          to="/dashboard/posts"
          className={navClass}
        >
          My Posts
        </NavLink>

        <NavLink
          to="/dashboard/drafts"
          className={navClass}
        >
          Drafts
        </NavLink>

        <NavLink
          to="/"
          className={navClass}
        >
          Back to Website
        </NavLink>

      </nav>

    </aside>
  );
}