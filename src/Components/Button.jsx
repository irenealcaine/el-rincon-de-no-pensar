const Button = ({ type, className, onClickValue, value, disabled }) => {
  let color = "";

  switch (type) {
    case "green":
      color = "bg-green-700 hover:bg-green-800";
      break;
    case "red":
      color = "bg-red-600 hover:bg-red-700";
      break;
    case "gray":
      color = "bg-gray-600 hover:bg-gray-700";
      break;
    case "violet":
      color = "bg-violet-600 hover:bg-violet-700";
      break;
    default:
      color = "bg-blue-600 hover:bg-blue-700";
  }

  return (
    <button
      className={`transition-all duration-200 text-white font-bold py-2.5 px-6 rounded-full shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${color} ${className}`}
      onClick={onClickValue}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;