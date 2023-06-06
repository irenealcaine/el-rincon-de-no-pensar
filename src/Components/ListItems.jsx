import { Link } from "react-router-dom";

const ListItems = ({ mapItems }) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center px-8">
      {mapItems.map((item) => {
        return (
          <Link
            to={item.to}
            className="flex flex-col items-center text-blue-900 md:w-3/12 w-full"
          >
            <p className="flex flex-col 2xl:flex-row justify-center items-center aspect-video shadow-lg md:gap-4 w-full p-4 border-2 border-blue-900 outline outline-offset-2 outline-blue-700/50 hover:outline-blue-900 rounded-xl hover:bg-blue-500 hover:text-white transition duration-300">
              {item.bigIcon}
              <p className="font-bold text-xl xl:text-4xl">{item.title}</p>
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ListItems;
