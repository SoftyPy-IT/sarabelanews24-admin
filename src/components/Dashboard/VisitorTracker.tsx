"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MapPin, Globe, Clock, ArrowUpRight } from "lucide-react"

// Simulated real-time visitor data
const generateVisitorData = () => {
  const now = new Date()
  const data = []

  for (let i = 30; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000)
    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      visitors: Math.floor(Math.random() * 30) + 20,
    })
  }

  return data
}

// Simulated location data
const locationData = [
  { country: "United States", count: 1245, percentage: 42 },
  { country: "United Kingdom", count: 745, percentage: 25 },
  { country: "India", count: 489, percentage: 16 },
  { country: "Germany", count: 302, percentage: 10 },
  { country: "Other", count: 198, percentage: 7 },
]

// Simulated referrer data
const referrerData = [
  { source: "Google", count: 2145, percentage: 52 },
  { source: "Direct", count: 945, percentage: 23 },
  { source: "Twitter", count: 445, percentage: 11 },
  { source: "Facebook", count: 345, percentage: 8 },
  { source: "Other", count: 245, percentage: 6 },
]

export function VisitorTracker() {
  const [activeVisitors, setActiveVisitors] = useState(87)
  const [visitorData, setVisitorData] = useState(generateVisitorData())

  // Simulate real-time visitor updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update active visitors (random fluctuation)
      setActiveVisitors((prev) => {
        const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
        return Math.max(50, prev + change)
      })

      // Update visitor chart data
      setVisitorData((prev) => {
        const now = new Date()
        const newTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        const newVisitors = Math.floor(Math.random() * 30) + 20

        const newData = [...prev.slice(1), { time: newTime, visitors: newVisitors }]
        return newData
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Real-Time Visitor Tracking</CardTitle>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            {activeVisitors} Active Now
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="referrers">Referrers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="h-[200px]">
              <ChartContainer
                config={{
                  visitors: {
                    label: "Active Visitors",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <AreaChart accessibilityLayer data={visitorData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="var(--color-visitors)"
                    fill="var(--color-visitors)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 border rounded-lg">
                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                  <p className="text-lg font-semibold">3m 42s</p>
                </div>
              </div>

              <div className="flex items-center p-4 border rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                  <p className="text-lg font-semibold">32.8%</p>
                </div>
              </div>

              <div className="flex items-center p-4 border rounded-lg">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Visitors</p>
                  <p className="text-lg font-semibold">64.2%</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="locations">
            <div className="space-y-4">
              {locationData.map((item) => (
                <div key={item.country} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{item.country}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{item.count}</span>
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-10">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="referrers">
            <div className="space-y-4">
              {referrerData.map((item) => (
                <div key={item.source} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{item.source}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{item.count}</span>
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-10">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

