// import { GithubIcon, Linkedin, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Left */}

          <div>

            <h2 className="text-3xl font-bold mb-4">
              BlogSpace
            </h2>

            <p className="text-slate-300 leading-7">
              Read amazing blogs, share your ideas, and connect with
              writers from around the world.
            </p>

          </div>

          {/* Middle */}

          <div>

            <h3 className="font-semibold text-xl mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-300">

              <li>Home</li>

              <li>Categories</li>

              <li>Search</li>

              <li>Create Blog</li>

            </ul>

          </div>

          {/* Right */}

          <div>

            <h3 className="font-semibold text-xl mb-4">
              Connect
            </h3>

            <div className="flex gap-4 text-slate-300">
  <span>GitHub</span>
  <span>LinkedIn</span>
  <span>Email</span>
</div>

          </div>

        </div>

        <hr className="my-10 border-slate-700" />

        <p className="text-center text-slate-400">
          © 2026 BlogSpace. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}