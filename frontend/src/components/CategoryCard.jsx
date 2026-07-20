export default function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer text-center">

      <h3 className="text-lg font-semibold">
        {category}
      </h3>

      <p className="text-gray-500 mt-2">
        Explore articles
      </p>

    </div>
  );
}