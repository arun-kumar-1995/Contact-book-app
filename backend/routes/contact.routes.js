import express from "express";
import {
  getContacts,
  uploadContacts,
  deleteContact,
  modifyContact,
} from "../controllers/contacts.controllers.js";
const router = express.Router();

router.route("/").get(getContacts);
router.route("/uploads").post(uploadContacts);
router.route("/:id").put(modifyContact).delete(deleteContact);

export default router;
