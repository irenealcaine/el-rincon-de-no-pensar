const HiperLink = ({ href, className, text }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`underline font-bold text-blue-900 ${className}`}
    >
      {text}
    </a>
  );
};

export default HiperLink;
