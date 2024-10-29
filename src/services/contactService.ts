import { In } from "typeorm";
import { Contact } from "../entities/Contact";
import {
  CreateContactDto,
  IdentifyContactDto,
  IdentifyContactResponse,
} from "../types/contact.dto";
import { AppDataSource } from "../utils/db";
import { BadRequestError, NotFoundError } from "../utils/errorHandler";

export const identifyContact = async (
  identifyContactDto: IdentifyContactDto
): Promise<IdentifyContactResponse> => {
  const { email, phoneNumber } = identifyContactDto;

  if (!email && !phoneNumber) {
    throw new BadRequestError(
      "Email or phone number must be provided for identification."
    );
  }

  const contactRepo = AppDataSource.getRepository(Contact);

  const emailMatches = email
    ? await contactRepo.find({ where: { email } })
    : [];
  const phoneMatches = phoneNumber
    ? await contactRepo.find({ where: { phoneNumber } })
    : [];

  const linkedContactIdList = [
    ...emailMatches.map((contact) => contact.linkedId),
    ...phoneMatches.map((contact) => contact.linkedId),
  ];

  const linkedContactList = await contactRepo.find({
    where: { id: In(linkedContactIdList) },
  });

  const allMatches = Array.from(
    new Set([...emailMatches, ...phoneMatches, ...linkedContactList])
  );

  if (allMatches.length === 0) {
    const newContact = contactRepo.create({
      email,
      phoneNumber,
      linkPrecedence: "primary",
    });
    await contactRepo.save(newContact);

    return {
      primaryContactId: newContact.id,
      emails: email ? [email] : [],
      phoneNumbers: phoneNumber ? [phoneNumber] : [],
      secondaryContactIds: [],
    };
  }

  const primaryContact = allMatches
    .filter((contact) => contact.linkPrecedence === "primary")
    .reduce(
      (oldest, contact) =>
        contact.createdAt < oldest.createdAt ? contact : oldest,
      allMatches[0]
    );

  for (const contact of allMatches) {
    if (
      contact.id !== primaryContact.id &&
      contact.linkPrecedence === "primary"
    ) {
      contact.linkPrecedence = "secondary";
      contact.linkedId = primaryContact.id;
      await contactRepo.save(contact);
    }
  }

  const linkedContacts = await contactRepo.find({
    where: [{ linkedId: primaryContact.id }, { id: primaryContact.id }],
  });

  const emails = [
    ...new Set(linkedContacts.map((contact) => contact.email).filter(Boolean)),
  ];
  const phoneNumbers = [
    ...new Set(
      linkedContacts.map((contact) => contact.phoneNumber).filter(Boolean)
    ),
  ];
  const secondaryContactIds = linkedContacts
    .filter((contact) => contact.linkPrecedence === "secondary")
    .map((contact) => contact.id);

  return {
    primaryContactId: primaryContact.id,
    emails,
    phoneNumbers,
    secondaryContactIds,
  };
};

export const createContact = async (
  createContactDto: CreateContactDto
): Promise<Contact> => {
  const { email, phoneNumber, linkedId, linkPrecedence } = createContactDto;

  if (!email && !phoneNumber) {
    throw new BadRequestError("Email or phone number must be provided.");
  }

  const contactRepo = AppDataSource.getRepository(Contact);
  const newContact = contactRepo.create({
    email,
    phoneNumber,
    linkedId,
    linkPrecedence,
  });
  await contactRepo.save(newContact);

  return newContact;
};

export const fetchAllContacts = async (): Promise<Contact[]> => {
  return await AppDataSource.getRepository(Contact).find();
};

export const fetchContactById = async (id: number): Promise<Contact> => {
  const contact = await AppDataSource.getRepository(Contact).findOneBy({ id });
  if (!contact) {
    throw new NotFoundError(`Contact with ID ${id} not found.`);
  }
  return contact;
};

export const updateContactById = async (
  id: number,
  updateContactDto: Partial<Contact>
): Promise<Contact> => {
  const contactRepo = AppDataSource.getRepository(Contact);
  const contact = await fetchContactById(id);
  await contactRepo.update(contact.id, updateContactDto);
  return fetchContactById(id);
};

export const deleteContactById = async (id: number): Promise<void> => {
  const contact = await fetchContactById(id);
  await AppDataSource.getRepository(Contact).delete(contact.id);
};
