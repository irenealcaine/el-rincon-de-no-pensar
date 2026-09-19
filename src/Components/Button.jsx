const Button = ({ type, className, onClickValue, value, disabled }) => {
  let color = "";

  switch (type) {
    case "green":
      color = "bg-green-500 hover:bg-green-600";
      break;
    case "red":
      color = "bg-red-500 hover:bg-red-600";
      break;
    case "gray":
      color = "bg-gray-400 hover:bg-gray-500";
      break;
    case "violet":
      color = "bg-violet-500 hover:bg-violet-600";
      break;
    default:
      color = "bg-blue-500 hover:bg-blue-600";
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