import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import "./Header.css";
import { MdAdd } from "react-icons/md";
const Header = () => {
  return (
    <header>
      <Search />
      <div>
        <button type="button" className="btn add-contact">
          <span>
            <MdAdd />
          </span>
          <p>New Contact</p>
        </button>
        <Filter />
      </div>
    </header>
  );
};

export default Header;
