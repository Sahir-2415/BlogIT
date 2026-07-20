export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-lg font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}