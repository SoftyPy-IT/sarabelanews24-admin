/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter, Mail, MoreHorizontal, Phone, Search, User, MapPin, Calendar, Globe, Clock, Monitor, Smartphone, Tablet, Facebook, Twitter, Linkedin, Instagram, ExternalLink, Copy, Eye } from 'lucide-react'
import { useGetVisitorsQuery } from "@/redux/dailynews/visitorApi"
import Loader from "../Loader"

export function VisitorContacts() {
  const { data, error, isLoading } = useGetVisitorsQuery({});
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterSubscribed, setFilterSubscribed] = useState<string | null>(null)
  const [selectedVisitor, setSelectedVisitor] = useState<any | null>(null)
  const itemsPerPage = 5

  if (isLoading) return <Loader/>;
  if (error) return <p>Error loading visitors</p>;

  // Map API data to the format our component expects
  const visitorData = data?.map((visitor: any) => ({
    id: visitor._id || `V-${Math.random().toString(36).substr(2, 5)}`,
    name: `Visitor ${visitor._id?.substr(-5) || Math.random().toString(36).substr(2, 5)}`,
    email: `visitor${visitor._id?.substr(-5) || Math.random().toString(36).substr(2, 5)}@example.com`,
    phone: "+1 (555) 123-4567",
    address: {
      // street: "Unknown Street",
      city: visitor.city || "Unknown",
      state: visitor.region || "",
      zipCode: visitor.zipCode || "00000",
      country: visitor.country || "Unknown",
    },
    lastVisit: visitor.visitedAt || new Date().toISOString(),
    firstVisit: visitor.visitedAt || new Date().toISOString(),
    pageViews: Math.floor(Math.random() * 30) + 1,
    totalVisits: Math.floor(Math.random() * 50) + 1,
    subscribed: Math.random() > 0.5,
    location: `${visitor.city || "Unknown"}, ${visitor.country || "Unknown"}`,
    device: visitor.browser?.includes("Mobile") ? "Mobile" : "Desktop",
    browser: visitor.browser ? visitor.browser.split(" ")[0] : "Unknown",
    os: visitor.browser ? extractOS(visitor.browser) : "Unknown",
    interests: ["News", "Technology"],
    referrer: visitor.referrer || "Direct",
    socialProfiles: {},
    tags: ["Visitor"],
    notes: "",
    avgTimeOnSite: `${Math.floor(Math.random() * 10)}m ${Math.floor(Math.random() * 60)}s`,
    conversionRate: parseFloat((Math.random() * 5).toFixed(1)),
    purchaseHistory: [],
    ip: visitor.ip || "Unknown",
    isp: visitor.isp || "Unknown",
  })) || [];

  // Helper function to extract OS from user agent string
  function extractOS(userAgent: string): string {
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("Linux")) return "Linux";
    return "Unknown";
  }

  // Filter visitors based on search term and subscription filter
  const filteredVisitors = visitorData.filter((visitor:any) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm) ||
      visitor.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.address.country.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSubscription =
      filterSubscribed === null ||
      (filterSubscribed === "subscribed" && visitor.subscribed) ||
      (filterSubscribed === "not-subscribed" && !visitor.subscribed)

    return matchesSearch && matchesSubscription
  })

  // Paginate visitors
  const indexOfLastVisitor = currentPage * itemsPerPage
  const indexOfFirstVisitor = indexOfLastVisitor - itemsPerPage
  const currentVisitors = filteredVisitors.slice(indexOfFirstVisitor, indexOfLastVisitor)
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage)

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Handle export to CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Address",
      "City",
      "State",
      "Zip Code",
      "Country",
      "Last Visit",
      "First Visit",
      "Page Views",
      "Total Visits",
      "Subscribed",
      "Device",
      "Browser",
      "OS",
      "Interests",
      "Referrer",
      "Avg Time on Site",
    ]

    const csvRows = [
      headers.join(","),
      ...filteredVisitors.map((visitor:any) =>
        [
          visitor.id,
          `"${visitor.name}"`,
          visitor.email,
          `"${visitor.phone}"`,
          `"${visitor.address.street}"`,
          `"${visitor.address.city}"`,
          `"${visitor.address.state}"`,
          visitor.address.zipCode,
          `"${visitor.address.country}"`,
          formatDate(visitor.lastVisit),
          formatDate(visitor.firstVisit),
          visitor.pageViews,
          visitor.totalVisits,
          visitor.subscribed ? "Yes" : "No",
          visitor.device,
          visitor.browser,
          visitor.os,
          `"${visitor.interests.join(", ")}"`,
          `"${visitor.referrer}"`,
          visitor.avgTimeOnSite,
        ].join(","),
      ),
    ]

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "visitor_contacts.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Get device icon
  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  // Get social media icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Could add a toast notification here
        console.log("Copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Visitor Contact Information</CardTitle>
            <CardDescription>Complete visitor profiles with contact details and activity history</CardDescription>
          </div>
          <Button onClick={exportToCSV} className="w-full md:w-auto" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export All Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone, location..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
            </div>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) => {
                  setFilterSubscribed(value === "all" ? null : value)
                  setCurrentPage(1) // Reset to first page on filter change
                }}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Subscription</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Visitors</SelectItem>
                  <SelectItem value="subscribed">Subscribed</SelectItem>
                  <SelectItem value="not-subscribed">Not Subscribed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitor</TableHead>
                  <TableHead>Contact Information</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentVisitors.length > 0 ? (
                  currentVisitors.map((visitor:any) => (
                    <TableRow key={visitor.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{visitor.name}</span>
                          <span className="text-xs text-muted-foreground">{visitor.id}</span>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            {getDeviceIcon(visitor.device)}
                            <span className="ml-1">
                              {visitor.device} • {visitor.browser}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>{visitor.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>{visitor.phone}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(visitor.socialProfiles || {}).map(([platform, handle]) => (
                              <Badge key={platform} variant="outline" className="text-xs flex items-center">
                                {getSocialIcon(platform)}
                                <span className="ml-1">{handle as string}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>
                              {visitor.address.city}, {visitor.address.country}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">{visitor.address.street}</div>
                          <div className="text-xs text-muted-foreground">
                            {visitor.address.state && `${visitor.address.state}, `}
                            {visitor.address.zipCode}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>Last: {new Date(visitor.lastVisit).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Eye className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>
                              {visitor.pageViews} views • {visitor.totalVisits} visits
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>Avg: {visitor.avgTimeOnSite}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant={visitor.subscribed ? "default" : "outline"}>
                            {visitor.subscribed ? "Subscribed" : "Not Subscribed"}
                          </Badge>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {visitor.tags.map((tag:any) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedVisitor(visitor)}>
                                <User className="h-4 w-4 mr-1" />
                                <span className="sr-only md:not-sr-only md:inline-block">Profile</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              {selectedVisitor && (
                                <>
                                  <DialogHeader>
                                    <DialogTitle className="text-xl flex items-center">
                                      <User className="h-5 w-5 mr-2" />
                                      Visitor Profile: {selectedVisitor.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Complete visitor information and activity history
                                    </DialogDescription>
                                  </DialogHeader>

                                  <Tabs defaultValue="overview" className="mt-4">
                                    <TabsList className="grid grid-cols-4 mb-4">
                                      <TabsTrigger value="overview">Overview</TabsTrigger>
                                      <TabsTrigger value="contact">Contact</TabsTrigger>
                                      <TabsTrigger value="activity">Activity</TabsTrigger>
                                      <TabsTrigger value="purchases">Purchases</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card>
                                          <CardHeader className="pb-2">
                                            <CardTitle className="text-base">Basic Information</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">ID:</span>
                                              <span className="font-medium">{selectedVisitor.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Name:</span>
                                              <span className="font-medium">{selectedVisitor.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Location:</span>
                                              <span className="font-medium">{selectedVisitor.location}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Status:</span>
                                              <Badge variant={selectedVisitor.subscribed ? "default" : "outline"}>
                                                {selectedVisitor.subscribed ? "Subscribed" : "Not Subscribed"}
                                              </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Tags:</span>
                                              <div className="flex flex-wrap gap-1 justify-end">
                                                {selectedVisitor.tags.map((tag:any) => (
                                                  <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                  </Badge>
                                                ))}
                                              </div>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">IP Address:</span>
                                              <span className="font-medium">{selectedVisitor.ip}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">ISP:</span>
                                              <span className="font-medium">{selectedVisitor.isp}</span>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-2">
                                            <CardTitle className="text-base">Activity Summary</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">First Visit:</span>
                                              <span className="font-medium">
                                                {formatDate(selectedVisitor.firstVisit)}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Last Visit:</span>
                                              <span className="font-medium">
                                                {formatDate(selectedVisitor.lastVisit)}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Total Visits:</span>
                                              <span className="font-medium">{selectedVisitor.totalVisits}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Page Views:</span>
                                              <span className="font-medium">{selectedVisitor.pageViews}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Avg. Time on Site:</span>
                                              <span className="font-medium">{selectedVisitor.avgTimeOnSite}</span>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">Interests & Referral</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Interests:</span>
                                            <div className="flex flex-wrap gap-1 justify-end">
                                              {selectedVisitor.interests.map((interest:any) => (
                                                <Badge key={interest} variant="outline" className="text-xs">
                                                  {interest}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Referrer:</span>
                                            <span className="font-medium">{selectedVisitor.referrer}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Conversion Rate:</span>
                                            <span className="font-medium">{selectedVisitor.conversionRate}%</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Device:</span>
                                            <div className="flex items-center">
                                              {getDeviceIcon(selectedVisitor.device)}
                                              <span className="ml-1 font-medium">
                                                {selectedVisitor.device} • {selectedVisitor.browser} •{" "}
                                                {selectedVisitor.os}
                                              </span>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">Notes</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <p className="text-sm">
                                            {selectedVisitor.notes || "No notes available for this visitor."}
                                          </p>
                                        </CardContent>
                                      </Card>
                                    </TabsContent>

                                    <TabsContent value="contact" className="space-y-4">
                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">Contact Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                              <span className="text-muted-foreground">Email:</span>
                                            </div>
                                            <div className="flex items-center">
                                              <span className="font-medium mr-2">{selectedVisitor.email}</span>
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => copyToClipboard(selectedVisitor.email)}
                                              >
                                                <Copy className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>

                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                              <span className="text-muted-foreground">Phone:</span>
                                            </div>
                                            <div className="flex items-center">
                                              <span className="font-medium mr-2">{selectedVisitor.phone}</span>
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => copyToClipboard(selectedVisitor.phone)}
                                              >
                                                <Copy className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>

                                          <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                              <span className="text-muted-foreground">Address:</span>
                                            </div>
                                            <div className="text-right">
                                              <div className="font-medium">{selectedVisitor.address.street}</div>
                                              <div>
                                                {selectedVisitor.address.city}, {selectedVisitor.address.state}{" "}
                                                {selectedVisitor.address.zipCode}
                                              </div>
                                              <div>{selectedVisitor.address.country}</div>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">Social Profiles</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {Object.entries(selectedVisitor.socialProfiles || {}).map(
                                              ([platform, handle]) => (
                                                <div
                                                  key={platform}
                                                  className="flex items-center justify-between border rounded-md p-2"
                                                >
                                                  <div className="flex items-center">
                                                    {getSocialIcon(platform)}
                                                    <span className="ml-2 capitalize">{platform}:</span>
                                                  </div>
                                                  <div className="flex items-center">
                                                    <span className="font-medium mr-2">{handle as string}</span>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                                      <ExternalLink className="h-3 w-3" />
                                                    </Button>
                                                  </div>
                                                </div>
                                              ),
                                            )}

                                            {Object.keys(selectedVisitor.socialProfiles || {}).length === 0 && (
                                              <div className="col-span-2 text-center text-muted-foreground py-4">
                                                No social profiles available for this visitor.
                                              </div>
                                            )}
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <div className="flex gap-2 justify-end">
                                        <Button variant="outline">
                                          <Mail className="mr-2 h-4 w-4" />
                                          Send Email
                                        </Button>
                                        <Button>
                                          <Phone className="mr-2 h-4 w-4" />
                                          Call Visitor
                                        </Button>
                                      </div>
                                    </TabsContent>

                                    <TabsContent value="activity" className="space-y-4">
                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">Visit History</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="space-y-4">
                                            <div className="flex justify-between items-center border-b pb-2">
                                              <div className="font-medium">First Visit</div>
                                              <div>{formatDate(selectedVisitor.firstVisit)}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b pb-2">
                                              <div className="font-medium">Last Visit</div>
                                              <div>{formatDate(selectedVisitor.lastVisit)}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b pb-2">
                                              <div className="font-medium">Total Visits</div>
                                              <div>{selectedVisitor.totalVisits}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b pb-2">
                                              <div className="font-medium">Page Views</div>
                                              <div>{selectedVisitor.pageViews}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b pb-2">
                                              <div className="font-medium">Average Time on Site</div>
                                              <div>{selectedVisitor.avgTimeOnSite}</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <div className="font-medium">Conversion Rate</div>
                                              <div>{selectedVisitor.conversionRate}%</div>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">Device Information</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="flex flex-col items-center p-4 border rounded-md">
                                              {getDeviceIcon(selectedVisitor.device)}
                                              <div className="mt-2 font-medium">{selectedVisitor.device}</div>
                                            </div>
                                            <div className="flex flex-col items-center p-4 border rounded-md">
                                              <Globe className="h-4 w-4" />
                                              <div className="mt-2 font-medium">{selectedVisitor.browser}</div>
                                            </div>
                                            <div className="flex flex-col items-center p-4 border rounded-md">
                                              <Monitor className="h-4 w-4" />
                                              <div className="mt-2 font-medium">{selectedVisitor.os}</div>
                                            </div>
                                          </div>
                                          <div className="mt-4 border-t pt-4">
                                            <div className="flex justify-between items-center mb-2">
                                              <span className="text-muted-foreground">IP Address:</span>
                                              <span className="font-medium">{selectedVisitor.ip}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <span className="text-muted-foreground">ISP:</span>
                                              <span className="font-medium">{selectedVisitor.isp}</span>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </TabsContent>

                                    <TabsContent value="purchases" className="space-y-4">
                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">Purchase History</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          {selectedVisitor.purchaseHistory &&
                                            selectedVisitor.purchaseHistory.length > 0 ? (
                                            <Table>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead>Date</TableHead>
                                                  <TableHead>Product</TableHead>
                                                  <TableHead className="text-right">Amount</TableHead>
                                                </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                {selectedVisitor.purchaseHistory.map((purchase:any, index:number) => (
                                                  <TableRow key={index}>
                                                    <TableCell>
                                                      {new Date(purchase.date).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>{purchase.product}</TableCell>
                                                    <TableCell className="text-right">
                                                      ${purchase.amount.toFixed(2)}
                                                    </TableCell>
                                                  </TableRow>
                                                ))}
                                                <TableRow>
                                                  <TableCell colSpan={2} className="text-right font-medium">
                                                    Total
                                                  </TableCell>
                                                  <TableCell className="text-right font-medium">
                                                    $
                                                    {selectedVisitor.purchaseHistory
                                                      .reduce((sum:any, item:any) => sum + item.amount, 0)
                                                      .toFixed(2)}
                                                  </TableCell>
                                                </TableRow>
                                              </TableBody>
                                            </Table>
                                          ) : (
                                            <div className="text-center text-muted-foreground py-8">
                                              No purchase history available for this visitor.
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>

                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">Subscription Status</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="flex flex-col items-center justify-center py-6">
                                            <Badge
                                              className="text-lg px-4 py-2 mb-2"
                                              variant={selectedVisitor.subscribed ? "default" : "outline"}
                                            >
                                              {selectedVisitor.subscribed ? "Active Subscriber" : "Not Subscribed"}
                                            </Badge>
                                            {selectedVisitor.subscribed ? (
                                              <p className="text-sm text-muted-foreground">
                                                This visitor has an active subscription to your premium content.
                                              </p>
                                            ) : (
                                              <div className="text-center">
                                                <p className="text-sm text-muted-foreground mb-4">
                                                  This visitor is not currently subscribed to your premium content.
                                                </p>
                                                <Button>Send Subscription Offer</Button>
                                              </div>
                                            )}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </TabsContent>
                                  </Tabs>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => copyToClipboard(visitor.email)}>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Copy Email</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(visitor.phone)}>
                                <Phone className="mr-2 h-4 w-4" />
                                <span>Copy Phone</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Edit Profile</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Export Details</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No visitors found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {filteredVisitors.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstVisitor + 1}-{Math.min(indexOfLastVisitor, filteredVisitors.length)} of{" "}
                {filteredVisitors.length} visitors
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(totalPages, 3) }).map((_, index) => {
                    let pageNumber = currentPage

                    if (totalPages <= 3) {
                      pageNumber = index + 1
                    } else if (currentPage === 1) {
                      pageNumber = index + 1
                    } else if (currentPage === totalPages) {
                      pageNumber = totalPages - 2 + index
                    } else {
                      pageNumber = currentPage - 1 + index
                    }

                    return (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNumber)}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  {totalPages > 3 && currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}