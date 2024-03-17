import { env } from "@/env";
import { schema } from "@/lib/data-schema";

export const getList = async () => {
  const response = await fetch(env.DATA_SOURCE);
  const data = await response.json();

  return schema
    .parse(data)
    .sort((a, b) => b.investments.length - a.investments.length);
};
