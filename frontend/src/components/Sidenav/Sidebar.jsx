import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>
          <Link to="/">Phonebook</Link>
        </h1>
      </div>
      <nav className="navbar">
        <ul>
          <Link to="/contacts">Contacts</Link>
          <Link to="/upload-contacts">Upload Contacts</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
