import { env } from "@/env";
import { getCompanyName } from "./utils/get-company-name";
import { getData } from "./utils/get-data";
import countBy from "lodash/countBy";
import * as pw from "playwright-core";

const main = async () => {
  const data = await getData(env.LIST_SOURCE!);
  const formattedInvestments = data?.map(({ investments }) => {
    const list = investments.map((investment) => {
      const { name, type } = getCompanyName(investment);
      return {
        name,
        rawName: investment.trim(),
        type,
      };
    });
    return list;
  });
  const dataArray = formattedInvestments?.flat();
  const d = countBy(dataArray, "name");
  const companies = Object.keys(d);

  const browser = await pw.chromium.launch();
  const response = await Promise.all(
    [companies[11]].map(async (company, i) => {
      const page = await browser.newPage();
      await page.goto(`https://finance.yahoo.com/`, {
        waitUntil: "networkidle",
      });
      const searchField = page.locator(
        `[aria-label="Search for news, symbols or companies"]`
      );
      searchField.fill(company);
      await page.keyboard.press("Enter");
      return page.url();
    })
  );
  // await browser.close();
  console.log(response);
};

main();
