import { useState } from "react";
import { Layout } from "../../hoc/Layout";
import "./ContactDetails.css";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const ContactDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

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
        <button
          type="button"
          className="btn-control btn-edit"
          onClick={openModal}
        >
          <FaRegEdit />
          Edit
        </button>
        <button type="button" className="btn-control btn-delete">
          <FaTrashCan />
          Delete
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="edit-details-wrapper">
            <div className="details-wrapper">
              <button className="close-modal" onClick={closeModal}>
                <MdClose />
              </button>
              <h2>Update details</h2>
              <div className="details-update-container">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="text" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" />
                </div>
              </div>
              <button type="button" className="btn btn-submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </center>
  );
};

export default Layout(ContactDetails);
