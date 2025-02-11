import { useState, useEffect } from "react";
import { API } from "../../axios/apiWrapper";
import { useToast } from "../../contexts/ToastContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  MdPhoneAndroid,
  MdOutlineFemale,
  MdOutlineMale,
  MdOutlineEmail,
} from "react-icons/md";
import Header from "../Header/Header";
import "./Contact.css";
import QueryBuilder from "../../utils/queryBuilder";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { csvDownload } from "../../services/ExcelService";

const perPageOptions = [10, 20, 50, 100];

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
    pages: 1,
    total: 0,
    docs: [],
  });

  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState({ type: "name", query: "" });
  const [filter, setFilter] = useState({ type: "filterBy", query: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const toast = useToast();
  const navigate = useNavigate();

  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  const getQuery = () => {
    return QueryBuilder(
      "/app/v1/contacts?",
      pageData.page,
      pageData.perPage,
      search.query
        ? { [search.type]: search.query }
        : filter.query
        ? { [filter.type]: filter.query }
        : {}
    );
  };

  const handlePageChange = (e, field) => {
    setPageData((prev) => ({
      ...prev,
      [field]: Number(e.target.value),
    }));
  };

  const handlePageIncrement = () => {
    setPageData((prev) =>
      prev.page < prev.pages ? { ...prev, page: prev.page + 1 } : prev
    );
  };

  const handlePageDecrement = () => {
    setPageData((prev) =>
      prev.page > 1 ? { ...prev, page: prev.page - 1 } : prev
    );
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSearch = (type, query) => {
    setSearch({ type, query });
  };

  const handleFilter = (type, query) => {
    setFilter({ type, query });
  };

  useEffect(() => {
    fetchContacts();
  }, [pageData.page, pageData.perPage, search, filter]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const query = getQuery();
      console.log(query);
      const response = await API.get(query);

      if (response.status === 200) {
        const data = response.data.data.contacts;
        setPageData((prev) => ({
          ...prev,
          page: data.page,
          perPage: data.perPage,
          pages: data.pages,
          total: data.total,
          docs: data.docs,
        }));
      }
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const response = await API.post(
        `/app/v1/contacts/delete-contacts`,
        { contactIds: selectedRows },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        fetchContacts();
        setSelectedRows([]);
        toast.success("Selected contact deleted");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };
  console.log(formData);
  const handleAddContact = async () => {
    try {
      const response = await API.post(
        `/app/v1/contacts/new-contact`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        closeModal();
        fetchContacts();
        toast.success(response.data.message || "New contact created");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  const handleFileExport = async () => {
    try {
      const response = await API.post(
        `/app/v1/contacts/export-csv`,
        { contactIds: selectedRows },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        csvDownload(data);
        toast.success(response.data.message || "File exported");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="contact-page">
      <Header
        onSearch={handleSearch}
        onFilter={handleFilter}
        onOpen={setIsModalOpen}
      />
      ;
      {selectedRows && selectedRows.length > 0 && (
        <div className="contact-controls">
          <button className="selected-contact">
            {selectedRows.length} Selected
          </button>
          <button className="delete-contact" onClick={handleBulkDelete}>
            Delete: {selectedRows.length}
          </button>
          <button className="export-contacts" onClick={handleFileExport}>
            Export selected
          </button>
        </div>
      )}
      {loading ? (
        <p>Loading contacts ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {pageData.docs.map((contact, index) => {
              const isSelected = selectedRows.includes(contact._id);

              return (
                <tr
                  key={contact._id}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <th>
                    {isSelected || hoveredRow === index ? (
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCheckboxChange(contact._id)}
                      />
                    ) : (
                      `#${index + 1 + (pageData.page - 1) * pageData.perPage}`
                    )}
                  </th>
                  <th>{contact.name}</th>
                  <th>
                    <MdOutlineEmail /> {contact.email}
                  </th>
                  <th>
                    {contact.gender === "Male" ? (
                      <MdOutlineMale />
                    ) : (
                      <MdOutlineFemale />
                    )}
                    {contact.gender}
                  </th>
                  <th>
                    <MdPhoneAndroid /> {contact.phone}
                  </th>
                  <th>
                    <Link to={`/contact-details/${contact._id}`}>
                      See detail
                    </Link>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="contact-footer">
        <div className="page-wrapper">
          <div>
            <span>Page</span>
            <select
              name="page"
              value={pageData.page}
              onChange={(e) => handlePageChange(e, "page")}
            >
              {Array.from({ length: pageData.pages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>Per Page</span>
            <select
              name="perPage"
              value={pageData.perPage}
              onChange={(e) => handlePageChange(e, "perPage")}
            >
              {perPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p>
          Total Records: <span>{pageData.total}</span>
        </p>
        <div>
          <button
            className="btn btn-prev"
            onClick={handlePageDecrement}
            disabled={pageData.page === 1}
          >
            <FaChevronLeft />
          </button>
          <button
            className="btn btn-next"
            onClick={handlePageIncrement}
            disabled={pageData.page === pageData.pages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <button className="close-modal" onClick={closeModal}>
              <MdClose />
            </button>
            <h2>New Contact</h2>
            <div className="modal-container">
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
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-submit"
              onClick={handleAddContact}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
