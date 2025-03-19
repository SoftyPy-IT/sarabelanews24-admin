"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Eye, ThumbsUp } from "lucide-react"
import { VisitorTracker } from "./VisitorTracker"
import { VisitorContacts } from "./VisitorContacts"
import { VisitorStatsChart } from "./VisitorStatsChart"
import { ContentCategoriesChart } from "./ContentCategoriesChart"
import { EngagementChart } from "./EngagementChart"

export default function DashboardContent() {
  const visitorStats = [
    { name: "Mon", visitors: 4000, pageViews: 2400 },
    { name: "Tue", visitors: 3000, pageViews: 1398 },
    { name: "Wed", visitors: 2000, pageViews: 9800 },
    { name: "Thu", visitors: 2780, pageViews: 3908 },
    { name: "Fri", visitors: 1890, pageViews: 4800 },
    { name: "Sat", visitors: 2390, pageViews: 3800 },
    { name: "Sun", visitors: 3490, pageViews: 4300 },
  ]

  const categoryData = [
    { name: "Politics", value: 400 },
    { name: "Technology", value: 300 },
    { name: "Sports", value: 300 },
    { name: "Entertainment", value: 200 },
    { name: "Business", value: 278 },
  ]

  const engagementData = [
    { category: "Politics", comments: 800, shares: 400 },
    { category: "Tech", comments: 600, shares: 300 },
    { category: "Sports", comments: 500, shares: 400 },
    { category: "Entertainment", comments: 400, shares: 200 },
  ]

  return (
    <div className="lg:p-4 space-y-4">

      <VisitorTracker />

    
      <VisitorContacts />

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold">24,582</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Eye className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Page Views</p>
              <h3 className="text-2xl font-bold">145.8K</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Time</p>
              <h3 className="text-2xl font-bold">4m 32s</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <ThumbsUp className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Engagement</p>
              <h3 className="text-2xl font-bold">87.2%</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Visitor Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <VisitorStatsChart data={visitorStats} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ContentCategoriesChart data={categoryData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <EngagementChart data={engagementData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

