import { schema } from "@/lib/data-schema";
import fs from "fs-extra";
import readXlsxFile from "read-excel-file/node";
import { Stream } from "stream";

const isString = (value: unknown): value is string => typeof value === "string";
const ensureString = (value: unknown): string =>
  typeof value === "string" ? value : String(value);

export const getData = async (source: string) => {
  const file = await fetch(source);
  if (!file.body) {
    return;
  }
  const blob = await file.arrayBuffer();

  const [, ...rows] = await readXlsxFile(Buffer.from(blob));

  const data = rows.map((row) => {
    const [name, party, location, registrationDate, time, investmentsString] =
      row;

    const isMultipleInvestments =
      isString(investmentsString) && investmentsString.includes(",");

    const investments =
      isString(investmentsString) && isMultipleInvestments
        ? investmentsString.split(",")
        : [ensureString(investmentsString)];

    const [firstName, lastName] =
      typeof name === "string" ? name.split(" ") : [name];

    return {
      firstName,
      lastName,
      investments,
      party,
      location,
      registrationDate: ensureString(registrationDate),
    };
  });

  return schema.parse(data);
};
