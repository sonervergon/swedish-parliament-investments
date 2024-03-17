import { schema } from "@/lib/data-schema";
import data from "../generated/data.json";

export const list = schema
  .parse(data)
  .sort((a, b) => b.investments.length - a.investments.length);
