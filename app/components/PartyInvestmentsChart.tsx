"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PureComponent } from "react";
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { list } from "../data";

interface Entry {
  antal: number;
  party: string;
}

const data = Object.values(
  list.reduce<Record<string, Entry>>((prev, current) => {
    if (prev[current.party]) {
      prev[current.party].antal =
        prev[current.party].antal + current.investments.length;
      return prev;
    }
    const entry = {
      antal: current.investments.length,
      party: current.party,
    };
    prev[current.party] = entry;

    return prev;
  }, {})
).sort((a, b) => b.antal - a.antal);

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="party" />

          <Tooltip />
          <Bar
            radius={[7, 7, 0, 0]}
            dataKey="antal"
            fill="#000"
            activeBar={<Rectangle radius={10} fill="#000" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export const PartyInvestmentsChart = () => {
  return (
    <Card className="flex-1 min-w-[300px] flex flex-col h-[330px]">
      <CardHeader>
        <CardTitle>Investeringar per parti</CardTitle>
        <CardDescription>
          {data[0].party}s representater har sammanlagt flest antal
          investeringar bland alla partier.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full">
        <Example />
      </CardContent>
    </Card>
  );
};
