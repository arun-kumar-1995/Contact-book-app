export const csvDownload = (csvData) => {
  const blob = new Blob([csvData], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "contacts.csv";
  link.click();

  window.URL.revokeObjectURL(url);
};
