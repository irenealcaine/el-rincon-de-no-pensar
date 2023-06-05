import {GoMail} from "react-icons/go"
import{FiGithub }from "react-icons/fi"

const Footer = () => {
    return (
        <footer className="text-xl absolute bottom-0 right-0 flex justify-end px-4 py-1 gap-4 bg-hero bg-large rounded-tl-lg border-t-2 border-l-2 border-blue-700">
            <a href="mailto:irenealcainealvarez@gmail.com" className="p-1 rounded-xl text-white bg-blue-700/50 backdrop-blur-sm flex items-center gap-2"><GoMail/><span className="text-sm hidden md:inline-block">irenealcainealvarez@gmail.com</span></a>
            <a href="https://github.com/irenealcaine" className="p-1 rounded-xl text-white bg-blue-700/50 backdrop-blur-sm flex items-center gap-2"><FiGithub/><span className="text-sm hidden md:inline-block">github.com/irenealcaine</span></a>
        </footer>
    )
}

export default Footer