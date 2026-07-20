import dashboardPosts from "../data/dashboardPosts";
import Button from "../components/Button";

export default function Drafts() {
  const drafts = dashboardPosts.filter(
    (post) => post.status === "Draft"
  );

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Drafts
      </h1>

      <div className="space-y-6">

        {drafts.map((post) => (

          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-bold">
                {post.title}
              </h2>

              <p className="text-gray-500">
                Last Updated: {post.date}
              </p>

            </div>

            <div className="flex gap-3">

              <Button>
                Edit
              </Button>

              <Button className="bg-green-600 hover:bg-green-700">
                Publish
              </Button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}