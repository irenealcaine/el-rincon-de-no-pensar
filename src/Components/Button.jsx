const Button = ({ className, onClickValue, value }) => {
  return (
    <button
      className={`bg-blue-900 duration-500 hover:bg-blue-500 hover:text-blue-100 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClickValue}
    >
      {value}
    </button>
  );
};

export default Button;
