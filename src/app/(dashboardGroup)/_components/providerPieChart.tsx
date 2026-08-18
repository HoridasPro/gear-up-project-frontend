"use client";

import { Props } from "@/type/type-gear";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FACC15", "#22C55E", "#8B5CF6"];

export default function ProviderPieChart({
  place: pending,
  pickedup,
  returned,
}: Props) {
  const data = [
    { name: "Pending", value: pending },
    { name: "Pickedup", value: pickedup },
    { name: "Returned", value: returned },
  ];

  return (
    <div className="rounded-xl border-gray-800/80 bg-[#0b0f19]/90 p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Rental Status Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100} label>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
