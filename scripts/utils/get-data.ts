import { schema } from "@/lib/data-schema";
import fs from "fs-extra";
import readXlsxFile from "read-excel-file/node";

const isString = (value: unknown): value is string => typeof value === "string";
const ensureString = (value: unknown): string =>
  typeof value === "string" ? value : String(value);

export const getData = async () => {
  const file = fs.readFileSync(process.cwd() + "/listan.xlsx");
  const [, ...rows] = await readXlsxFile(file);

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
