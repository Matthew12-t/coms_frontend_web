import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { peakHoursData } from "../../lib/mockData";

const peak = peakHoursData.reduce(
  (acc, point) => (point.load > acc.load ? point : acc),
  peakHoursData[0]
);

function PeakHoursChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={peakHoursData} margin={{ top: 30, right: 20, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="peakFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B2A5B" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#0B2A5B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94A3B8", fontSize: 11 }}
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }}
            formatter={(value) => [`${value}%`, "Load"]}
          />
          <Area
            type="monotone"
            dataKey="load"
            stroke="none"
            fill="url(#peakFill)"
          />
          <Line
            type="monotone"
            dataKey="load"
            stroke="#0B2A5B"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <ReferenceDot
            x={peak.time}
            y={peak.load}
            r={6}
            fill="#DC2626"
            stroke="#FFFFFF"
            strokeWidth={3}
            label={{
              value: `Peak Reached: ${peak.load}%`,
              position: "top",
              fill: "#FFFFFF",
              fontSize: 11,
              offset: 12,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PeakHoursChart;
