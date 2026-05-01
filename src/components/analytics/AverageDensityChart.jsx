import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { averageDensity } from "../../lib/mockData";

function AverageDensityChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={averageDensity}
          layout="vertical"
          margin={{ top: 0, right: 30, bottom: 0, left: 60 }}
          barSize={14}
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis
            type="category"
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12 }}
            width={120}
          />
          <Bar dataKey="percent" radius={[8, 8, 8, 8]} background={{ fill: "#F1F5F9", radius: 8 }}>
            {averageDensity.map((row) => (
              <Cell
                key={row.day}
                fill={row.lowest ? "#22C55E" : "#0B2A5B"}
              />
            ))}
            <LabelList
              dataKey="percent"
              position="right"
              formatter={(v) => `${v}%`}
              fill="#475569"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageDensityChart;
