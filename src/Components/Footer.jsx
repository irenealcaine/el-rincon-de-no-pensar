import { GoMail } from "react-icons/go";
import { FiGithub } from "react-icons/fi";
import { TbWorldWww } from "react-icons/tb";

const socialMedia = [
  {
    href: "mailto:irenealcainealvarez@gmail.com",
    icon: <GoMail />,
    text: "irenealcainealvarez@gmail.com",
  },
  {
    href: "https://github.com/irenealcaine",
    icon: <FiGithub />,
    text: "github.com/irenealcaine",
  },
  {
    href: "https://irenealcainealvarez.es/",
    icon: <TbWorldWww />,
    text: "irenealcainealvarez.es",
  },
];

const Footer = () => {
  return (
    <footer className="mt-16 text-xl w-fit sticky bottom-0 right-0 flex justify-end px-4 py-1 gap-4 bg-hero bg-large rounded-r-lg border-y-2 border-r-2 border-blue-900">
      {socialMedia.map((media) => (
        <a
          href={media.href}
          className="p-1 rounded-xl text-white bg-blue-700/50 backdrop-blur-sm flex items-center gap-2"
        >
          {media.icon}
          <span className="text-sm hidden lg:inline-block">{media.text}</span>
        </a>
      ))}
    </footer>
  );
};

export default Footer;
