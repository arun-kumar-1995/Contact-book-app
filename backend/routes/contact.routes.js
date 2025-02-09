import express from "express";
import {
  getContacts,
  uploadContacts,
  deleteContact,
  modifyContact,
  createContact,
  deleteMultipleContact,
} from "../controllers/contacts.controllers.js";
import { validateUserInput } from "../middlewares/validateUserInput.middleware.js";
import uploads from "../configs/multer.configs.js";
import handleMulterError from "../middlewares/multerError.middleware.js";
const router = express.Router();

router.route("/").get(getContacts);
router
  .route("/uploads")
  .post(uploads.single("file"), handleMulterError, uploadContacts);

router
  .route("/:id")
  .put(validateUserInput, modifyContact)
  .delete(deleteContact);

router.route("/new-contact").post(validateUserInput, createContact);

router.route("/delete-contacts").delete(deleteMultipleContact);

router.route("/contact-details").get(getContactDetails);

export default router;
