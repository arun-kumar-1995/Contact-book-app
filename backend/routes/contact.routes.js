import express from "express";
import {
  getContacts,
  uploadContacts,
  deleteContact,
  modifyContact,
  createContact,
} from "../controllers/contacts.controllers.js";
import { validateUserInput } from "../middlewares/validateUserInput.middleware.js";

const router = express.Router();

router.route("/").get(getContacts);
router.route("/uploads").post(uploadContacts);
router
  .route("/:id")
  .put(validateUserInput, modifyContact)
  .delete(deleteContact);
router.route("/new-contact").post(validateUserInput, createContact);

export default router;
