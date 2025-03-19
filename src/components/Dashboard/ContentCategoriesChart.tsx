"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ContentCategoriesProps {
  data: {
    name: string
    value: number
  }[]
}

export function ContentCategoriesChart({ data }: ContentCategoriesProps) {
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <ChartContainer
      config={{
        politics: {
          label: "Politics",
          color: COLORS[0],
        },
        technology: {
          label: "Technology",
          color: COLORS[1],
        },
        sports: {
          label: "Sports",
          color: COLORS[2],
        },
        entertainment: {
          label: "Entertainment",
          color: COLORS[3],
        },
        business: {
          label: "Business",
          color: COLORS[4],
        },
      }}
      className="h-full"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}

