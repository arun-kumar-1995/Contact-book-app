import { useEffect, useState } from "react";

import { Layout } from "../../hoc/Layout";
import { FaRegFileAlt } from "react-icons/fa";
import "./UploadContact.css";
import { useToast } from "../../contexts/ToastContext";
import {
  ReadCsvFile,
  validateRows,
  UploadCsvFile,
} from "../../services/ExcelService";

const UploadContact = () => {
  const [rejectedRows, setRejectedRows] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [fileName, setFileName] = useState("");

  const toast = useToast();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Select a file to upload");
      return;
    }
    setFileName(file.name);
    ReadCsvFile(file, (data) => {
      if (!data || data.length === 0) {
        toast.error("Invalid or empty CSV file");
        return;
      }

      const { validRows, rejectedRows } = validateRows(data);
      setParsedData(validRows);
      setRejectedRows(rejectedRows);
    });
  };

  const handleCsvUpload = () => {
    if (!fileName) toast.error("Select file to upload");
    if (rejectedRows.length === 0 && parsedData.length > 0) {
      UploadCsvFile(parsedData, toast);
      setFileName("");
      setParsedData([]);
      setRejectedRows([]);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-contact-container">
        <h2>Upload Contact</h2>
        <div className="upload-wrapper">
          <div className="upload-contact">
            <FaRegFileAlt />
            <div className="upload-info">
              <p>Supports only csv file</p>
            </div>
            <div className="browse-file">
              <input type="file" id="file-upload" onChange={handleFileUpload} />
              <label htmlFor="file-upload">Browse</label>
            </div>
            {fileName && <p className="file-name">Uploaded File: {fileName}</p>}
          </div>
        </div>

        {rejectedRows && rejectedRows.length > 0 ? (
          <>
            <h4 className="caption">
              There are {rejectedRows.length} rejected rows
            </h4>
            <table>
              <thead>
                <tr>
                  <th>Row Index</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {rejectedRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row.rowIndex}</td>
                    <td>{JSON.stringify(row.data)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          fileName && (
            <>
              <div className="file-error">
                <p>There are no rejected rows</p>
              </div>

              <button
                className="file-upload"
                onClick={handleCsvUpload}
                disabled={rejectedRows.length > 0}
              >
                Upload Contacts
              </button>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Layout(UploadContact);
