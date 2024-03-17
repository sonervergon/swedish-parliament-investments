import fs from "fs-extra";
import { getData } from "./utils/get-data";
import { env } from "@/env";

const main = async () => {
  const data = await getData(env.LIST_SOURCE!);
  await fs.outputJSON(process.cwd() + "/generated/data.json", data);
};

main();
