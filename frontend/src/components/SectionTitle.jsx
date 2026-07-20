export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-4xl font-bold">{title}</h2>

      {subtitle && (
        <p className="text-gray-500 mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}