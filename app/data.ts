import data from "../generated/data.json";
import z from "zod";

const schema = z.array(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    investments: z.array(z.string()),
    party: z.string(),
    location: z.string(),
    registrationDate: z.string(),
  })
);

export const list = schema.parse(data);
