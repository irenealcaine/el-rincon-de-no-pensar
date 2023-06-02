const Button = ({ className, onClickValue, value, disabled }) => {
  return (
    <button
      className={`bg-blue-900 duration-500 hover:bg-blue-500 hover:text-blue-100 text-white font-bold py-2 px-8 rounded ${className}`}
      onClick={onClickValue}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
