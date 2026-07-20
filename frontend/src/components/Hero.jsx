import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

      <div className="max-w-7xl mx-auto px-6 py-28 text-center">

        <h1 className="text-6xl font-bold leading-tight">

          Share Your Story

          <br />

          Inspire The World

        </h1>

        <p className="text-xl mt-8 max-w-2xl mx-auto">

          A modern blogging platform where developers,
          writers and creators share knowledge.

        </p>

        <div className="mt-10">

          <Link
            to="/register"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100"
          >
            Start Writing
          </Link>

        </div>

      </div>

    </section>
  );
}