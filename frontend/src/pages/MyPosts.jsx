import dashboardPosts from "../data/dashboardPosts";
import Button from "../components/Button";

export default function MyPosts() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        My Posts
      </h1>

      <div className="space-y-6">

        {dashboardPosts.map((post) => (

          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-bold">
                {post.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {post.category} • {post.status}
              </p>

            </div>

            <div className="flex gap-3">

              <Button>
                Edit
              </Button>

              <Button className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}