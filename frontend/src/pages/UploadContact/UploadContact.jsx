import { Layout } from "../../hoc/Layout";
import { FaRegFileAlt } from "react-icons/fa";
import "./UploadContact.css";

const UploadContact = () => {
  return (
    <div className="upload-contact-container">
      <h2>Upload Contact</h2>
      <div className="upload-wrapper">
        <div className="upload-contact">
          <FaRegFileAlt />
          <div className="upload-info">
            <p>Supports only csv file</p>
          </div>
          <div className="browse-file">
            <input type="file" id="file-upload" />
            <label htmlFor="file-upload">Browse</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout(UploadContact);
