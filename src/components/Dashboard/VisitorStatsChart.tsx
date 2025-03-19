"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VisitorStatsProps {
  data: {
    name: string
    visitors: number
    pageViews: number
  }[]
}

export function VisitorStatsChart({ data }: VisitorStatsProps) {
  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Visitors",
          color: "hsl(var(--chart-1))",
        },
        pageViews: {
          label: "Page Views",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-visitors)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-visitors)",
            r: 4,
          }}
          activeDot={{
            r: 6,
          }}
        />
        <Line
          type="monotone"
          dataKey="pageViews"
          stroke="var(--color-pageViews)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-pageViews)",
            r: 4,
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

