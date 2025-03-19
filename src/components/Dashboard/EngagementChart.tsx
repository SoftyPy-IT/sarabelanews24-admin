"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EngagementChartProps {
  data: {
    category: string
    comments: number
    shares: number
  }[]
}

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <ChartContainer
      config={{
        comments: {
          label: "Comments",
          color: "hsl(var(--chart-1))",
        },
        shares: {
          label: "Shares",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <BarChart
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
        <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="comments" fill="var(--color-comments)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="shares" fill="var(--color-shares)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}

