export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl transition duration-300">

      <img
        src={post.image}
        alt={post.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-6">

        <span className="text-blue-600 font-semibold text-sm">
          {post.category}
        </span>

        <h3 className="text-2xl font-bold mt-3">
          {post.title}
        </h3>

        <p className="text-gray-600 mt-4">
          {post.description}
        </p>

        <div className="flex justify-between text-sm text-gray-500 mt-6">

          <span>{post.author}</span>

          <span>{post.date}</span>

        </div>

      </div>

    </div>
  );
}