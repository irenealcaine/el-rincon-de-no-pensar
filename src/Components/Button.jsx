const Button = ({ type, className, onClickValue, value, disabled }) => {
  let color = "";

  switch (type) {
    case "green":
      color = "bg-green-500 hover:bg-green-900 hover:text-green-100";
      break;
    case "red":
      color = "bg-red-500 hover:bg-red-900 hover:text-red-100";
      break;
    case "gray":
      color = "bg-gray-500 hover:text-red-200";
      break;
    case "violet":
      color = "bg-violet-500 hover:bg-violet-900 hover:text-violet-100";
      break;
    default:
      color = "bg-blue-500 hover:bg-blue-900 hover:text-blue-100";
  }

  return (
    <button
      className={`transition duration-500 text-white font-bold py-2 px-8 rounded ${color} ${className}`}
      onClick={onClickValue}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
