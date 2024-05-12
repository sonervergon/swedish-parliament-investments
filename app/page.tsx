import { format } from "date-fns";
import dayjs from "dayjs";
import "dayjs/locale/sv";
import relativeTime from "dayjs/plugin/relativeTime";
import { Metadata } from "next";
import { FAQButton } from "./components/FAQButton";
import { InvestmentsClickable } from "./components/InvestmentsClickable";
import { InvestmentsPieChart } from "./components/InvestmentsPieChart";
import { KeepMeUpdated } from "./components/KeepMeUpdated";
import { PartyInvestmentsChart } from "./components/PartyInvestmentsChart";
import { getList } from "./data";

dayjs.extend(relativeTime);
dayjs.locale("sv");

export const metadata: Metadata = {
  title: "Ledamöternas Investeringsdata",
  description:
    "Få insyn och se alla Svenska riksdagledamöters ekonomiska investeringar med ett enkelt klick, helt öppet och publikt",
};

export default async function Home() {
  const data = await getList();
  return (
    <main className="md:flex py-16 min-h-screen max-w-screen bg-white flex-col items-center justify-between p-2 lg:p-24">
      <div className="max-w-4xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl mb-2 font-semibold  text-gray-900">
              Riksdagspolitikernas ekonomiska investeringar
            </h1>
            <p className="text-sm mb-3 text-gray-700">
              Se hur de svenska politikerna investerar sina pengar
            </p>
          </div>
        </div>
        <KeepMeUpdated />
        <FAQButton />
        <div className="flex gap-4 mt-16 flex-wrap flex-row w-full">
          <InvestmentsPieChart totalInList={data.length} />
          <PartyInvestmentsChart input={data} />
        </div>
        <div className=" -mx-4 mt-8 w-full overflow-x-auto sm:-mx-0">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Namn
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Parti
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Minsta värde
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Investeringar
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Registreringsdatum
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y cursor-default divide-gray-200 bg-white">
                {data.map((person, i) => (
                  <tr key={i}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      Politiker {i + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.party}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Intl.NumberFormat("sv-SE", {
                        style: "currency",
                        currency: "SEK",
                      }).format(person.investments.length * 114600)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <InvestmentsClickable
                        amount={person.investments.length}
                        firstName="denna"
                        lastName="politiker"
                      >
                        {person.investments.length}
                      </InvestmentsClickable>{" "}
                      <span style={{ fontSize: 9 }} className="text-xs">
                        bolag
                      </span>
                    </td>
                    <td
                      title={format(
                        new Date(person.registrationDate),
                        "dd-MM-yyy"
                      )}
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {dayjs(person.registrationDate).fromNow()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div id="faq" className="sm:flex mt-16 flex-col">
          <div className="sm:flex-auto mb-12">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Hur kan jag använda denna data?
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Det är helt upp till dig. Du kan använda den för att samla
              inspiration till ditt egna aktiesparande eller till exempel göra
              egna undersökningar baserat på insikterna som du kan plocka ut
              från datan.
            </p>
          </div>
          <div className="sm:flex-auto mb-12">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Hur ser jag exakt vilka företag en politiker har investerat i?
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Vi jobbar på att få in den datan, håll utkik här.
            </p>
          </div>
          <div className="sm:flex-auto mb-12">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Hur kommer det sig att denna data finns tillgänglig här?
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Varje riksdagsledamot måste rapportera deras åtaganden och
              ekonomiska intressen, detta med syfte av att skapa öppenhet och
              insyn. Tyvärr finns denna data inte tillgänglig på riksdagens
              webbplats, därför har vi tagit fram den och gjort den enkel att
              komma åt.
            </p>
          </div>
          <div className="sm:flex-auto mb-12">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Varför finns inte alla riksdagledamöter med i listan?
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Om ledamoten inte har några investeringar eller om värdet på
              åtagandet eller det ekonomiska intresset är under två
              prisbasbelopp (57 300kr * 2 = 114 600kr för 2024) så behöver inte
              ledamoten rapportera några investeringar. Detta kan vara en
              anledning till att alla ledamöter inte har rapporterad något.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
