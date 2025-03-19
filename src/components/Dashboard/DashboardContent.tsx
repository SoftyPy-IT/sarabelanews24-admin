/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Eye, ThumbsUp } from "lucide-react"
import { VisitorTracker } from "./VisitorTracker"
import { VisitorContacts } from "./VisitorContacts"
import { VisitorStatsChart } from "./VisitorStatsChart"
import { ContentCategoriesChart } from "./ContentCategoriesChart"
import { EngagementChart } from "./EngagementChart"
import { useGetVisitorsQuery } from "@/redux/dailynews/visitorApi"
import { useMemo } from "react"

export default function DashboardContent() {
  const { data: visitors = [], error, isLoading } = useGetVisitorsQuery({})

  // Process visitor data for statistics
  const stats = useMemo(() => {
    if (!visitors || !visitors.length)
      return {
        totalUsers: 0,
        pageViews: 0,
        avgTime: "0m 0s",
        engagement: "0%",
      }

    // Calculate total unique users (based on unique IPs)
    const uniqueIps = new Set(visitors.map((visitor: any) => visitor.ip))
    const totalUsers = uniqueIps.size

    // Calculate page views (each visitor entry counts as a page view)
    const pageViews = visitors.length

    // For average time, we'd need session duration data
    // This is a placeholder calculation - you'll need to adjust based on your actual data
    const avgTime = "4m 32s" // Replace with actual calculation when you have session duration

    // For engagement, this would typically be calculated from interaction metrics
    // This is a placeholder - replace with actual calculation
    const engagement = "87.2%" // Replace with actual calculation

    return {
      totalUsers,
      pageViews,
      avgTime,
      engagement,
    }
  }, [visitors])

  // Process visitor data for visitor stats chart
  const visitorStats = useMemo(() => {
    if (!visitors || !visitors.length) return []

    // Group visitors by day of week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const dayStats = daysOfWeek.map((day) => ({
      name: day,
      visitors: 0,
      pageViews: 0,
    }))

    visitors.forEach((visitor: any) => {
      const visitDate = new Date(visitor.visitedAt)
      const dayIndex = visitDate.getDay() // 0 = Sunday, 1 = Monday, etc.

      dayStats[dayIndex].visitors += 1
      dayStats[dayIndex].pageViews += 1 // Assuming 1 page view per visit
    })

    // Reorder to start with Monday
    const mondayFirst = [...dayStats.slice(1), dayStats[0]]
    return mondayFirst
  }, [visitors])

  // Process visitor data for content categories
  // This would require content category data in your visitor records
  // For now, using placeholder data - replace with actual data processing
  const categoryData = useMemo(() => {
    // Replace this with actual processing of your visitor data by content category
    return [
      { name: "Politics", value: visitors?.length ? Math.floor(visitors.length * 0.3) : 0 },
      { name: "Technology", value: visitors?.length ? Math.floor(visitors.length * 0.25) : 0 },
      { name: "Sports", value: visitors?.length ? Math.floor(visitors.length * 0.2) : 0 },
      { name: "Entertainment", value: visitors?.length ? Math.floor(visitors.length * 0.15) : 0 },
      { name: "Business", value: visitors?.length ? Math.floor(visitors.length * 0.1) : 0 },
    ]
  }, [visitors])

  // Process visitor data for engagement by category
  // This would require engagement data in your visitor records
  // For now, using placeholder data - replace with actual data processing
  const engagementData = useMemo(() => {
    // Replace this with actual processing of your visitor data by engagement metrics
    return [
      {
        category: "Politics",
        comments: visitors?.length ? Math.floor(visitors.length * 0.4) : 0,
        shares: visitors?.length ? Math.floor(visitors.length * 0.2) : 0,
      },
      {
        category: "Tech",
        comments: visitors?.length ? Math.floor(visitors.length * 0.3) : 0,
        shares: visitors?.length ? Math.floor(visitors.length * 0.15) : 0,
      },
      {
        category: "Sports",
        comments: visitors?.length ? Math.floor(visitors.length * 0.2) : 0,
        shares: visitors?.length ? Math.floor(visitors.length * 0.2) : 0,
      },
      {
        category: "Entertainment",
        comments: visitors?.length ? Math.floor(visitors.length * 0.1) : 0,
        shares: visitors?.length ? Math.floor(visitors.length * 0.1) : 0,
      },
    ]
  }, [visitors])

  // Group visitors by country for location-based analysis
  const visitorsByCountry = useMemo(() => {
    if (!visitors || !visitors.length) return {}

    const countryMap: { [key: string]: number } = {}
    visitors.forEach((visitor: any) => {
      const country = visitor.country || "Unknown"
      countryMap[country] = (countryMap[country] || 0) + 1
    })

    return countryMap
  }, [visitors])

  // Group visitors by browser
  const visitorsByBrowser = useMemo(() => {
    if (!visitors || !visitors.length) return {}

    const browserMap: { [key: string]: number } = {}
    visitors.forEach((visitor: any) => {
      // Extract browser name from user agent string
      const browserInfo = visitor.browser || ""
      let browserName = "Unknown"

      if (browserInfo.includes("Chrome")) browserName = "Chrome"
      else if (browserInfo.includes("Firefox")) browserName = "Firefox"
      else if (browserInfo.includes("Safari")) browserName = "Safari"
      else if (browserInfo.includes("Edge")) browserName = "Edge"

      browserMap[browserName] = (browserMap[browserName] || 0) + 1
    })

    return browserMap
  }, [visitors])

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading dashboard data...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading visitor data. Please try again later.</div>
  }

  return (
    <div className="lg:p-4 space-y-4">
       <VisitorTracker />

      <VisitorContacts/> 
      {/* <EngagementChart data={visitors} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Eye className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Page Views</p>
              <h3 className="text-2xl font-bold">{stats.pageViews.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Time</p>
              <h3 className="text-2xl font-bold">{stats.avgTime}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <ThumbsUp className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Engagement</p>
              <h3 className="text-2xl font-bold">{stats.engagement}</h3>
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


      {/* N ew: Visitors by Country */}
      <Card style={{ marginTop: '80px' }}>
        <CardHeader>
          <CardTitle>Visitors by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(visitorsByCountry).map(([country, count]) => (
              <div key={country} className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span className="font-medium">{country}</span>
                <span className="text-primary font-bold">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New: Visitors by Browser */}
      <Card >
        <CardHeader>
          <CardTitle>Visitors by Browser</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(visitorsByBrowser).map(([browser, count]) => (
              <div key={browser} className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span className="font-medium">{browser}</span>
                <span className="text-primary font-bold">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

