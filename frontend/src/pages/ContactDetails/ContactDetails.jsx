import { Layout } from "../../hoc/Layout";
import "./ContactDetails.css";

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
    </center>
  );
};

export default Layout(ContactDetails);
