import multer from "multer";
const handleMulterError = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Internal Server Error";

  if (!req.file) {
    errorMessage = "No file uploaded";
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // return res.status(413).json({ error: "File size exceeds 5MB limit" });
      errorMessage = "File size exceeds 5MB limit";
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      // return res.status(400).json({ error: "Invalid file type. Only CSV allowed" });
      errorMessage = "Invalid file type. Only CSV allowed";
    }
  }
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
  });
};

export default handleMulterError;
