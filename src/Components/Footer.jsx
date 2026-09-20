import React from "react";
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
    <footer className="fixed bottom-0 right-0 z-30 flex items-center gap-2 rounded-tl-2xl border border-b-0 border-r-0 border-ink/10 bg-white/70 px-3 py-2 shadow-card backdrop-blur-md md:px-4">
      {socialMedia.map((media) => (
        <a
          key={media.href}
          href={media.href}
          className="flex items-center gap-2 rounded-full p-2 text-ink transition-all duration-200 hover:bg-clay hover:text-white md:p-2.5"
        >
          {media.icon}
          <span className="hidden text-sm font-semibold lg:inline-block">
            {media.text}
          </span>
        </a>
      ))}
    </footer>
  );
};

export default Footer;