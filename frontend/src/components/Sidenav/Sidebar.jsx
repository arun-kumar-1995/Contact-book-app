import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="navbar">
        <ul>
          <Link to="/contacts">Contacts</Link>
          <Link to="/upload-contacts">Upload Contacts</Link>
          <Link to="/contact-detail">Contact Detail</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
