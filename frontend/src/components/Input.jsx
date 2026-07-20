export default function Input({
  type = "text",
  placeholder,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    />
  );
}