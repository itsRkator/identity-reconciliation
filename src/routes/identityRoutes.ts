import express, { Router } from "express";
import {
  addContact,
  getContact,
  getContacts,
  identify,
  removeContact,
  updateContact,
} from "../controllers/contactController";

const router: Router = express.Router();

router.post("/identify", identify);
router.post("/", addContact);
router.get("/", getContacts);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", removeContact);

export default router;
