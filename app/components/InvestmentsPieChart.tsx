"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { list } from "../data";

const MAX_POLITICIANS = 349;

const data = [
  { name: "Rapporterat", value: list.length },
  { name: "Ej rapporterat", value: MAX_POLITICIANS - list.length },
];

const COLORS = ["#c084fc", "#000"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    cornerRadius,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const direction = cos >= 0 ? 1 : -1;
  const mx = cx + (innerRadius + 0) * cos;
  const my = cy + (innerRadius + 0) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1);
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  const centerx = cx + direction * 6 + innerRadius * cos;
  const centery = cy - direction * 6 + innerRadius * sin;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        cornerRadius={cornerRadius}
        endAngle={endAngle}
        fill={fill}
      />

      <text x={centerx} y={centery} textAnchor={textAnchor} fill="#fff">
        {`${Math.round(percent * 100)}%`}
      </text>
    </g>
  );
};

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj";

  state = {
    activeIndex: 0,
  };

  onPieEnter = (_: any, index: number) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie
            activeIndex={[0, 1]}
            activeShape={renderActiveShape}
            onMouseEnter={this.onPieEnter}
            data={data}
            cx="50%"
            cy="50%"
            paddingAngle={3}
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            cornerRadius={10}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                radius={800}
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export const InvestmentsPieChart = () => {
  return (
    <Card className="flex-1 min-w-[300px] flex flex-col h-[330px]">
      <CardHeader>
        <CardTitle>Andel rapporter från ledamöter</CardTitle>
        <CardDescription>
          21% ({list.length} av 349) ledamöter i riksdagen har rapporterat
          ekonomiska intressen.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full">
        <Example />
      </CardContent>
    </Card>
  );
};
