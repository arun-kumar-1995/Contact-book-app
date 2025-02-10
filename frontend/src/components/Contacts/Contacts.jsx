import { useState, useEffect } from "react";

import Header from "../Header/Header";
import "./Contact.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  MdPhoneAndroid,
  MdOutlineFemale,
  MdOutlineMale,
  MdOutlineEmail,
} from "react-icons/md";
import { API } from "../../axios/apiWrapper";
import { useToast } from "../../contexts/ToastContext";

const perPageOptions = [10, 20, 50, 100];

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState({ name: "", phone: "", email: "" });
  const [filter, setFilter] = useState({ filterBy: "" });

  const toast = useToast();

  useEffect(() => {
    fetchContacts();
  }, [page, perPage, search]);

  const fetchContacts = async () => {
    setLoading(true);

    try {
      // const response = await API.get(`/app/v1/contacts`, {
      //   params: {
      //     name: search.name,
      //     email: search.email,
      //     phone: search.phone,
      //     filterBy: filter.filterBy,
      //     page,
      //     perPage,
      //   },
      // });
      const response = await API.get(
        `/app/v1/contacts?page=${page}&perPage=${perPage}`
      );
      if (response.status === 200) {
        setContacts(response.data.contacts);
        // setTotalRecords(response.data.totalRecords);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div>
      <Header />
      <div className="contact-controls">
        <button className="selected-contact">2 Selected</button>
        <button className="delete-contact"> Delete: 2 </button>
        <button className="export-contacts">Export selected</button>
      </div>

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
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <th>#{index + 1 + (page - 1) * perPage}</th>
                <th>{contact.name}</th>
                <th>
                  <MdOutlineEmail /> {contact.email}
                </th>
                <th>
                  {contact.gender === "Male" ? (
                    <MdOutlineMale />
                  ) : (
                    <MdOutlineFemale />
                  )}{" "}
                  {contact.gender}
                </th>
                <th>
                  <MdPhoneAndroid /> {contact.phone}
                </th>
                <th>
                  <Link to={`/contact-details/${contact._id}`}>See detail</Link>
                </th>
              </tr>
            ))}
          </tbody>
          {/* <tr>
              <th>#1</th>
              <th>Arun Kumar</th>
              <th>
                <MdOutlineEmail />
                arun.devpro@gmail.com
              </th>
              <th>
                <MdOutlineFemale /> Female
              </th>
              <th>
                <MdPhoneAndroid />
                +91-7004486562
              </th>
              <th>
                <Link to="/contact-details/1">See detail</Link>
              </th>
            </tr>
            <tr>
              <th>#1</th>
              <th>Arun Kumar</th>
              <th>arun.devpro@gmail.com</th>
              <th>
                <MdOutlineMale />
                Male
              </th>
              <th>+91-7004486562</th>
              <th>
                <Link to="/contact-details/2">See detail</Link>
              </th>
            </tr>
            <tr>
              <th>#1</th>
              <th>Arun Kumar</th>
              <th>arun.devpro@gmail.com</th>
              <th>+91-7004486562</th>
              <th>
                <Link to="/contact-details">See detail</Link>
              </th>
            </tr> */}
        </table>
      )}
      <div className="contact-footer">
        <div className="page-wrapper">
          <div>
            <span>Page</span>

            <select name="" id="">
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>Per Page</span>

            <select name="" id="">
              <option key="10" value={10}>
                10
              </option>
              <option key="20" value={20}>
                20
              </option>
              <option key="50" value={50}>
                50
              </option>
              <option key="100" value={100}>
                100
              </option>
            </select>
          </div>
        </div>
        <p>
          Total Records: <span>1245</span>
        </p>

        <div>
          <button className="btn btn-prev">
            <FaChevronLeft />
          </button>
          <button className="btn btn-next">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
