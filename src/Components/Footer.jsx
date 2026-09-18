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
    <footer className="fixed bottom-0 right-0 text-xl w-fit flex justify-end px-4 py-1 gap-4 bg-hero bg-large rounded-tl-lg border-t-2 border-l-2 border-blue-900">
      {socialMedia.map((media) => (
        <a
          key={media.href}
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
