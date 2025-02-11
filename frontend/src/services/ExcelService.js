import * as XLSX from "xlsx";
import { API } from "../axios/apiWrapper";

export const csvDownload = (csvData) => {
  const blob = new Blob([csvData], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "contacts.csv";
  link.click();

  window.URL.revokeObjectURL(url);
};

export const validateRow = (row) => {
  const { name, email, phone, gender } = row;

  if (!name || !email || !phone || !gender) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  if (!emailRegex.test(email) || !phoneRegex.test(phone)) return false;

  return true;
};

export const ReadCsvFile = (file, callback) => {
  if (!file) return;

  const reader = new FileReader();
  reader.readAsBinaryString(file);

  reader.onload = (e) => {
    const binaryStr = e.target.result;
    const workbook = XLSX.read(binaryStr, { type: "binary" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    callback(data);
  };
};

// Function to validate rows
export const validateRows = (data) => {
  const validRows = [];
  const rejectedRows = [];

  data.forEach((row, index) => {
    const [name, email, phone, gender] = row;

    if (name && email && phone && gender) {
      validRows.push(row);
    } else {
      rejectedRows.push({ rowIndex: index + 1, data: row });
    }
  });

  return { validRows, rejectedRows };
};

export const UploadCsvFile = async (fileRawData, toast) => {
  console.log(fileRawData);
  try {
    const response = await API.post(`/app/v1/contacts/uploads`, {
      contacts: fileRawData,
    });
    if (response.statusCode === 200) {
      toast.success(response?.data?.message || "Contact uploaded");
    }
  } catch (err) {
    console.log(err);
    toast.error(
      err.response.data.message || "Error uploading contacts to the database."
    );
  }
};
