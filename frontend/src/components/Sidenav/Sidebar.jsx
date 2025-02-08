import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>Phonebook</h1>
      </div>
      <nav className="navbar">
        <ul>
          <Link to="/">Contacts</Link>
          <Link to="/upload-contacts">Upload Contacts</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
