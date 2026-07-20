import { Link } from "react-router-dom";
import Button from "../components/Button";
import user from "../data/user";

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-40 h-40 rounded-full object-cover"
          />

          <div className="flex-1">

            <h1 className="text-4xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-500 mt-2">
              @{user.username}
            </p>

            <p className="mt-5 text-gray-700">
              {user.bio}
            </p>

            <p className="mt-3">
              📧 {user.email}
            </p>

            <div className="flex gap-3 mt-6">

              <Link
                to={user.github}
                target="_blank"
                className="text-blue-600"
              >
                GitHub
              </Link>

              <Link
                to={user.linkedin}
                target="_blank"
                className="text-blue-600"
              >
                LinkedIn
              </Link>

            </div>

            <Link to="/dashboard/profile/edit">

              <Button className="mt-8">
                Edit Profile
              </Button>

            </Link>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-blue-600 text-white rounded-xl p-6">
          <h2 className="text-lg">Posts</h2>
          <p className="text-4xl font-bold mt-2">
            {user.posts}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6">
          <h2 className="text-lg">Drafts</h2>
          <p className="text-4xl font-bold mt-2">
            {user.drafts}
          </p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-6">
          <h2 className="text-lg">Categories</h2>
          <p className="text-4xl font-bold mt-2">
            {user.categories}
          </p>
        </div>

      </div>

    </div>
  );
}