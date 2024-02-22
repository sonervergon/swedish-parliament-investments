import readXlsxFile from "read-excel-file/node";
import fs from "fs-extra";

const main = async () => {
  const file = fs.readFileSync(process.cwd() + "/listan.xlsx");

  const [header, ...rows] = await readXlsxFile(file);

  const data = rows.map((row) => {
    const [name, party, location, registrationDate, time, investmentsString] =
      row;

    const investments =
      typeof investmentsString === "string" ? investmentsString.split(",") : [];

    const [firstName, lastName] =
      typeof name === "string" ? name.split(" ") : [name];

    return {
      firstName,
      lastName,
      investments,
      party,
      location,
      registrationDate,
    };
  });
  await fs.outputJSON(process.cwd() + "/generated/data.json", data);
};

main();
