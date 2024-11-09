// src/components/ConversionRateChart.tsx
import React, { useEffect } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetConversionRate } from "../../queries/conversionRate";
import useStore from "../../store";
import { ConversionRate } from "../../types";
import {
  formatTooltipContent,
  formatTooltipLabel,
} from "../../utils/formatTooltip";
import "./ConversionRateChart.css";

const ConversionRateChart: React.FC = () => {
  const { data, isLoading, error, dataUpdatedAt } = useGetConversionRate();
  const conversionRates = useStore((state) => state.conversionRates);
  const setConversionRates = useStore((state) => state.setConversionRates);

  useEffect(() => {
    if (data) {
      const newRate: ConversionRate = {
        timestamp: new Date(),
        conversionRate: data.conversionRate,
      };

      setConversionRates((prevRates) => {
        const updatedRates = [...prevRates, newRate].slice(-100);
        return updatedRates;
      });
    }
  }, [dataUpdatedAt, data, setConversionRates]);

  if (isLoading && conversionRates.length === 0) {
    return <div>Loading conversion rates...</div>;
  }

  if (error) {
    return <div>Error loading conversion rates...</div>;
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={conversionRates}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(tickItem) =>
              new Date(tickItem).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
            }
          >
            <Label value="Time" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={["auto", "auto"]}
            allowDecimals={true}
            tickFormatter={(tick) => tick.toFixed(2)}
          >
            <Label
              value="Conversion Rate"
              angle={-90}
              position="insideLeft"
              offset={-10}
            />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            labelFormatter={formatTooltipLabel}
            formatter={formatTooltipContent}
          />
          <Legend verticalAlign="top" height={36} />
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <Line
            type="monotone"
            dataKey="conversionRate"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "#82ca9d", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionRateChart;
