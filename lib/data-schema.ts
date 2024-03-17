import z from "zod";

export const schema = z.array(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    investments: z.array(z.string()),
    party: z.string(),
    location: z.string(),
    registrationDate: z.string(),
  })
);
