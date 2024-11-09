// src/utils/formatTooltip.ts
export const formatTooltipLabel = (label: string | number) =>
  `Time: ${new Date(label).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })}`;

export const formatTooltipContent = (value: number | string) => [
  `${value}`,
  "Conversion Rate",
];
