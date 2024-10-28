export interface CreateContactDto {
  phoneNumber?: string;
  email?: string;
  linkedId?: number;
  linkPrecedence?: "primary" | "secondary";
}

export interface IdentifyContactDto {
  email?: string;
  phoneNumber?: string;
}

export interface IdentifyContactResponse {
  primaryContactId: number;
  emails: string[];
  phoneNumbers: string[];
  secondaryContactIds: number[];
}
