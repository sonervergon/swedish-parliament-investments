import { format } from "date-fns";
import dayjs from "dayjs";
import "dayjs/locale/sv";
import relativeTime from "dayjs/plugin/relativeTime";
import { Metadata } from "next";
import { InvestmentsClickable } from "./components/InvestmentsClickable";
import { list } from "./data";
import { KeepMeUpdated } from "./components/KeepMeUpdated";

dayjs.extend(relativeTime);
dayjs.locale("sv");

export const metadata: Metadata = {
  title: "Ledamöternas Investeringsdata",
  description:
    "Få insyn och se alla Svenska riksdagledamöters ekonomiska investeringar med ett enkelt klick, helt öppet och publikt",
};

export default function Home() {
  return (
    <main className="md:flex py-16 min-h-screen max-w-screen bg-white flex-col items-center justify-between p-2 lg:p-24">
      <div className="max-w-3xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl mb-2 font-semibold leading-6 text-gray-900">
              Riksdagspolitikernas ekonomiska investeringar
            </h1>
            <p className="text-sm mb-3 text-gray-700">
              Se hur de svenska politikerna investerar sina pengar
            </p>
          </div>
          <KeepMeUpdated />
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
                    Antal investeringar
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
                {list.map((person) => (
                  <tr key={person.firstName + person.lastName}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.firstName} {person.lastName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.party}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <InvestmentsClickable
                        name={person.firstName + " " + person.lastName}
                      >
                        {person.investments.length}
                      </InvestmentsClickable>
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
        <div className="sm:flex mt-16 flex-col sm:items-center">
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
