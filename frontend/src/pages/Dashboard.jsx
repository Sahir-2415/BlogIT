import StatsCard from "../components/StatsCard";
import dashboardPosts from "../data/dashboardPosts";

export default function Dashboard() {
  return (
    <div>

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome back! Here's an overview of your blog.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <StatsCard
          title="Published Posts"
          value="8"
          color="bg-blue-600"
        />

        <StatsCard
          title="Drafts"
          value="4"
          color="bg-amber-500"
        />

        <StatsCard
          title="Categories"
          value="6"
          color="bg-emerald-600"
        />

      </div>

      <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold mb-5">
          Recent Posts
        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left border-b">

              <th className="pb-3">Title</th>

              <th>Status</th>

              <th>Category</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {dashboardPosts.map((post) => (

              <tr
                key={post.id}
                className="border-b"
              >

                <td className="py-4">
                  {post.title}
                </td>

                <td>{post.status}</td>

                <td>{post.category}</td>

                <td>{post.date}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}