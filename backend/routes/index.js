import express from "express";
import contactRoute from "./contact.routes.js";

const router = express.Router();


router.use("/contacts", contactRoute);
export default router;
