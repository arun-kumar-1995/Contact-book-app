import { Layout } from "../../hoc/Layout";
import "./ContactDetails.css";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
// import user from "/assets/user.jpg";

const ContactDetails = () => {
  return (
    <center>
      <div className="page-header">
        <h1>Contact Details</h1>
      </div>

      <div className="contact-card">
        <img src="https://via.placeholder.com/100" alt="User Photo" />
        <h2>John Doe</h2>
        <p>
          <span>Email:</span> johndoe@example.com
        </p>
        <p>
          <span>Phone:</span> +123 456 7890
        </p>
        <p>
          <span>Gender:</span> Male
        </p>
      </div>
      <div className="card-control">
        <button type="button" className="btn-control btn-edit">
          <FaRegEdit />
          Edit
        </button>
        <button type="button" className="btn-control btn-delete">
          <FaTrashCan />
          Delete
        </button>
      </div>
    </center>
  );
};

export default Layout(ContactDetails);
