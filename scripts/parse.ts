import fs from "fs-extra";
import { getData } from "./utils/get-data";

const main = async () => {
  const data = await getData();
  await fs.outputJSON(process.cwd() + "/generated/data.json", data);
};

main();
