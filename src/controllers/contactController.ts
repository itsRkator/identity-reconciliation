import { NextFunction, Request, Response } from "express";
import { CreateContactDto, IdentifyContactDto } from "../types/contact.dto";
import {
  createContact,
  deleteContactById,
  fetchAllContacts,
  fetchContactById,
  identifyContact,
  updateContactById,
} from "../services/contactService";
import { Contact } from "../entities/Contact";

export const identify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const identifyContactDto: IdentifyContactDto = req.body;
    const result = await identifyContact(identifyContactDto);

    res.status(200).json({ contact: result });
  } catch (error) {
    next(error);
  }
};

export const addContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createContactDto: CreateContactDto = req.body;
    const contact = await createContact(createContactDto);
    res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts = await fetchAllContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};
export const getContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const contact = await fetchContactById(+id);
    res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateContactDto: Partial<Contact> = req.body;
    const updatedContact = await updateContactById(+id, updateContactDto);
    res.status(200).json({ contact: updatedContact });
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteContactById(+id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};
