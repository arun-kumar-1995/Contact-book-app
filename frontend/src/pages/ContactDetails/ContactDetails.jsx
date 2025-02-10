import { useState, useEffect } from "react";
import { Layout } from "../../hoc/Layout";
import "./ContactDetails.css";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { API } from "../../axios/apiWrapper";

const ContactDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getContactDetails();
  }, [id]);

  const getContactDetails = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(`/app/v1/contacts/contact-details/${id}`);
      if (response.status === 200) {
        const data = response.data.data?.details;
        setContactDetails(data);
        setFormData({
          name: data?.name || "",
          email: data?.email || "",
          phone: data?.phone || "",
        });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(formData);
  const handleEdit = async () => {
    try {
      const response = await API.put(
        `/app/v1/contacts/edit-contact/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        toast.success("Contact updated successfully!");
        setContactDetails(response.data.data);
        closeModal();
        getContactDetails();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;
    try {
      await API.delete(`/app/v1/contacts/delete-contact/${id}`);
      toast.success("Contact deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  console.log(formData);

  return (
    <center>
      <div className="page-header">
        <h1>Contact Details</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : contactDetails ? ( // Fixed incorrect JSX wrapping
        <>
          <div className="contact-card">
            <img src="https://via.placeholder.com/100" alt="User Photo" />
            <h2>{contactDetails?.name}</h2>
            <p>
              <span>Email:</span> {contactDetails?.email}
            </p>
            <p>
              <span>Phone:</span> {contactDetails?.phone}
            </p>
            <p>
              <span>Gender:</span> {contactDetails?.gender}
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
            <button
              type="button"
              className="btn-control btn-delete"
              onClick={handleDelete}
            >
              <FaTrashCan />
              Delete
            </button>
          </div>
        </>
      ) : (
        <p>No Contact Found</p>
      )}

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
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-submit"
                onClick={handleEdit}
              >
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
