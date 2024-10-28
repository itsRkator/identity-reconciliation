import { Request, Response } from "express";

export const identify = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;
};
