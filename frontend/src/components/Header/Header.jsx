import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <Search />
      <Filter />
    </header>
  );
};

export default Header;
