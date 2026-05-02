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

function PeakHoursChart({ data = [], loading = false }) {
  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center text-sm text-slate-400">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center text-sm text-slate-400">
        No data yet — run the camera simulation to see results.
      </div>
    );
  }

  const peak = data.reduce(
    (acc, point) => (point.load > acc.load ? point : acc),
    data[0]
  );

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 30, right: 20, bottom: 0, left: 0 }}>
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
            tick={{ fill: "#94A3B8", fontSize: data.length > 12 ? 9 : 11 }}
            angle={data.length > 12 ? -45 : 0}
            textAnchor={data.length > 12 ? "end" : "middle"}
            height={data.length > 12 ? 45 : 20}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }}
            formatter={(value) => [value, "People"]}
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
              value: `Peak: ${peak.load} people`,
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
