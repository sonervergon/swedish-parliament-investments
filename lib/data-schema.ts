import z from "zod";

export const schema = z.array(
  z.object({
    investments: z.array(z.string()),
    party: z.string(),
    location: z.string(),
    registrationDate: z.string(),
  })
);
