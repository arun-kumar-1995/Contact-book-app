import Header from "../Header/Header";
import "./Contact.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const perPageOptions = [10, 20, 50, 100];
import { Link } from "react-router-dom";
import {
  MdPhoneAndroid,
  MdOutlineFemale,
  MdOutlineMale,
  MdOutlineEmail,
} from "react-icons/md";

const Contacts = () => {
  return (
    <div>
      <Header />
      <div className="contact-controls">
        <button className="selected-contact">
        2 Selected</button>
        <button className="delete-contact"> Delete: 2 </button>
        <button className="export-contacts">Export selected</button>
      </div>

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
          <tr>
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
          </tr>
        </tbody>
      </table>
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
