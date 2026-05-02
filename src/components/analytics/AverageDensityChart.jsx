import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function AverageDensityChart({ data = [], loading = false }) {
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

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 50, bottom: 0, left: 60 }}
          barSize={14}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12 }}
            width={120}
          />
          <Bar dataKey="count" radius={[8, 8, 8, 8]} background={{ fill: "#F1F5F9", radius: 8 }}>
            {data.map((row) => (
              <Cell
                key={row.day}
                fill={row.lowest ? "#22C55E" : "#0B2A5B"}
              />
            ))}
            <LabelList
              dataKey="count"
              position="right"
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
