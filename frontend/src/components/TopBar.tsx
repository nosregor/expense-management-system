import { FaPlus } from "react-icons/fa";

type TopBarProps = {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
};

const TopBar = ({ title, buttonText, onButtonClick }: TopBarProps) => {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl hidden sm:inline font-semibold text-gray-900">
          {title}
        </h1>
        <h1 className="sm:text-2xl sm:hidden font-semibold text-gray-900">
          {title}
        </h1>
      </div>
      <div>
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-black rounded-md shadow-sm hover:bg-gray-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 focus-visible:ring-opacity-50"
        >
          <FaPlus className="mr-2" />
          <span className="hidden sm:inline">{buttonText} expense</span>
          <span className="sm:hidden">{buttonText}</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
