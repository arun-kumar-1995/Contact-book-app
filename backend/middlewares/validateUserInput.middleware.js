import ErrorHandler from "../utils/errorHandler.utils.js";

export const validateUserInput = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || name.length === 0 || typeof name !== "string")
    return ErrorHandler(res, 400, "Enter your name");

  if (!email || email.length === 0 || typeof email !== "string")
    return ErrorHandler(res, 400, "Enter your email");

  if (!phone || typeof phone !== "number")
    return ErrorHandler(res, 400, "Enter your phone number");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return ErrorHandler(res, 400, "Invalid email format.");

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone))
    return ErrorHandler(
      res,
      400,
      "Phone number must be a 10-digit numeric value."
    );

  next();
};
