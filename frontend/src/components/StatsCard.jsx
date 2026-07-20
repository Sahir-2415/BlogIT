export default function StatsCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className={`rounded-xl shadow-lg p-6 text-white ${color}`}
    >

      <p className="text-lg">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

    </div>
  );
}