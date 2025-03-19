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
import {
  Download,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  User,
  MapPin,
  Calendar,
  Globe,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink,
  Copy,
  Eye,
} from "lucide-react"
import { useGetVisitorsQuery } from "@/redux/dailynews/visitorApi"

// Enhanced visitor data with more comprehensive information
const visitorData = [
  {
    id: "V-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    lastVisit: "2025-03-16T14:32:00",
    firstVisit: "2024-11-05T09:15:00",
    pageViews: 27,
    totalVisits: 42,
    subscribed: true,
    location: "New York, USA",
    device: "Desktop",
    browser: "Chrome",
    os: "Windows 11",
    interests: ["Politics", "Technology", "Business"],
    referrer: "Google Search",
    socialProfiles: {
      twitter: "@johnsmith",
      linkedin: "johnsmith",
      facebook: "john.smith.123",
    },
    tags: ["Premium", "Active"],
    notes: "Interested in subscription offers. Called on 2025-02-15 about premium content access.",
    avgTimeOnSite: "4m 12s",
    conversionRate: 3.2,
    purchaseHistory: [
      { date: "2025-01-15", product: "Premium Subscription", amount: 49.99 },
      { date: "2024-12-10", product: "Special Report", amount: 9.99 },
    ],
  },
  {
    id: "V-1002",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    phone: "+1 (555) 987-6543",
    address: {
      street: "45 Park Avenue",
      city: "London",
      state: "",
      zipCode: "SW1A 1AA",
      country: "UK",
    },
    lastVisit: "2025-03-17T09:15:00",
    firstVisit: "2024-10-22T15:30:00",
    pageViews: 42,
    totalVisits: 67,
    subscribed: true,
    location: "London, UK",
    device: "Mobile",
    browser: "Safari",
    os: "iOS 18",
    interests: ["Business", "Entertainment", "Fashion"],
    referrer: "Direct",
    socialProfiles: {
      twitter: "@emmaj",
      instagram: "emma.johnson",
      linkedin: "emmajohnson",
    },
    tags: ["Premium", "Influencer"],
    notes: "Marketing partnership potential. Has large social media following.",
    avgTimeOnSite: "6m 45s",
    conversionRate: 5.7,
    purchaseHistory: [
      { date: "2025-02-20", product: "Annual Subscription", amount: 129.99 },
      { date: "2025-01-05", product: "Financial Report Bundle", amount: 24.99 },
    ],
  },
  {
    id: "V-1003",
    name: "Raj Patel",
    email: "raj.patel@example.com",
    phone: "+91 98765 43210",
    address: {
      street: "78 Marine Drive",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India",
    },
    lastVisit: "2025-03-16T22:45:00",
    firstVisit: "2024-12-01T11:20:00",
    pageViews: 15,
    totalVisits: 23,
    subscribed: false,
    location: "Mumbai, India",
    device: "Tablet",
    browser: "Chrome",
    os: "Android 15",
    interests: ["Sports", "Technology", "Local News"],
    referrer: "Facebook",
    socialProfiles: {
      twitter: "@rajpatel",
      facebook: "raj.patel.official",
    },
    tags: ["Free Tier"],
    notes: "Frequently reads sports content. Potential for sports newsletter subscription.",
    avgTimeOnSite: "2m 30s",
    conversionRate: 0.8,
    purchaseHistory: [],
  },
  {
    id: "V-1004",
    name: "Maria Garcia",
    email: "maria.g@example.com",
    phone: "+34 612 345 678",
    address: {
      street: "Calle Gran Vía 25",
      city: "Madrid",
      state: "",
      zipCode: "28013",
      country: "Spain",
    },
    lastVisit: "2025-03-17T11:20:00",
    firstVisit: "2024-09-15T08:45:00",
    pageViews: 31,
    totalVisits: 58,
    subscribed: true,
    location: "Madrid, Spain",
    device: "Desktop",
    browser: "Firefox",
    os: "macOS 15",
    interests: ["Politics", "Entertainment", "Travel"],
    referrer: "Newsletter",
    socialProfiles: {
      instagram: "maria.garcia.travel",
      linkedin: "mariagarcia",
    },
    tags: ["Premium", "International"],
    notes: "Interested in international politics coverage. Speaks English and Spanish.",
    avgTimeOnSite: "5m 15s",
    conversionRate: 4.2,
    purchaseHistory: [
      { date: "2025-03-01", product: "Premium Subscription", amount: 49.99 },
      { date: "2025-02-15", product: "Political Analysis Report", amount: 14.99 },
    ],
  },
  {
    id: "V-1005",
    name: "Liu Wei",
    email: "liu.wei@example.com",
    phone: "+86 139 1234 5678",
    address: {
      street: "123 Nanjing Road",
      city: "Shanghai",
      state: "",
      zipCode: "200000",
      country: "China",
    },
    lastVisit: "2025-03-16T18:05:00",
    firstVisit: "2025-01-10T09:30:00",
    pageViews: 19,
    totalVisits: 27,
    subscribed: false,
    location: "Shanghai, China",
    device: "Mobile",
    browser: "Chrome",
    os: "Android 15",
    interests: ["Business", "Technology", "International Trade"],
    referrer: "LinkedIn",
    socialProfiles: {
      linkedin: "liuwei",
      twitter: "@liuwei_tech",
    },
    tags: ["Free Tier", "Business Reader"],
    notes: "Reads primarily business and technology articles. Works in international trade.",
    avgTimeOnSite: "3m 50s",
    conversionRate: 1.5,
    purchaseHistory: [],
  },
  {
    id: "V-1006",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 234-5678",
    address: {
      street: "456 Queen Street",
      city: "Toronto",
      state: "ON",
      zipCode: "M5V 2A8",
      country: "Canada",
    },
    lastVisit: "2025-03-17T08:40:00",
    firstVisit: "2024-08-20T14:15:00",
    pageViews: 53,
    totalVisits: 89,
    subscribed: true,
    location: "Toronto, Canada",
    device: "Desktop",
    browser: "Edge",
    os: "Windows 11",
    interests: ["Politics", "Sports", "Health"],
    referrer: "Twitter",
    socialProfiles: {
      twitter: "@sarahw",
      linkedin: "sarahwilliams",
      instagram: "sarah.williams",
    },
    tags: ["Premium", "Long-term"],
    notes: "Subscriber since 2024. Very engaged with political content and opinion pieces.",
    avgTimeOnSite: "7m 20s",
    conversionRate: 6.8,
    purchaseHistory: [
      { date: "2025-01-10", product: "Annual Subscription", amount: 129.99 },
      { date: "2024-11-05", product: "Election Special Report", amount: 19.99 },
      { date: "2024-09-15", product: "Political Analysis Bundle", amount: 29.99 },
    ],
  },
  {
    id: "V-1007",
    name: "Ahmed Hassan",
    email: "ahmed.h@example.com",
    phone: "+20 100 123 4567",
    address: {
      street: "15 Tahrir Square",
      city: "Cairo",
      state: "",
      zipCode: "11511",
      country: "Egypt",
    },
    lastVisit: "2025-03-16T20:15:00",
    firstVisit: "2024-11-30T12:45:00",
    pageViews: 24,
    totalVisits: 36,
    subscribed: true,
    location: "Cairo, Egypt",
    device: "Mobile",
    browser: "Safari",
    os: "iOS 18",
    interests: ["Sports", "Business", "Middle East News"],
    referrer: "Google Search",
    socialProfiles: {
      facebook: "ahmed.hassan.official",
      twitter: "@ahmedhassan",
    },
    tags: ["International", "Sports Fan"],
    notes: "Particularly interested in football coverage and Middle Eastern business news.",
    avgTimeOnSite: "4m 05s",
    conversionRate: 3.5,
    purchaseHistory: [{ date: "2025-02-01", product: "Premium Subscription", amount: 49.99 }],
  },
  {
    id: "V-1008",
    name: "Anna Müller",
    email: "anna.m@example.com",
    phone: "+49 170 1234567",
    address: {
      street: "Friedrichstraße 123",
      city: "Berlin",
      state: "",
      zipCode: "10117",
      country: "Germany",
    },
    lastVisit: "2025-03-17T10:30:00",
    firstVisit: "2024-10-05T16:20:00",
    pageViews: 37,
    totalVisits: 62,
    subscribed: false,
    location: "Berlin, Germany",
    device: "Desktop",
    browser: "Chrome",
    os: "Windows 11",
    interests: ["Technology", "Entertainment", "European Politics"],
    referrer: "Newsletter",
    socialProfiles: {
      linkedin: "annamueller",
      twitter: "@anna_mueller",
    },
    tags: ["Free Tier", "Tech Reader"],
    notes: "Technology journalist. Reads tech news and reviews regularly.",
    avgTimeOnSite: "5m 45s",
    conversionRate: 2.3,
    purchaseHistory: [],
  },
]

export function VisitorContacts() {
  const { data, error, isLoading } = useGetVisitorsQuery({});
  console.log('vistor data', data)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterSubscribed, setFilterSubscribed] = useState<string | null>(null)
  const [selectedVisitor, setSelectedVisitor] = useState<(typeof visitorData)[0] | null>(null)
  const itemsPerPage = 5

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading visitors</p>;

  // Filter visitors based on search term and subscription filter
  const filteredVisitors = visitorData.filter((visitor) => {
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
      ...filteredVisitors.map((visitor) =>
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
                  currentVisitors.map((visitor) => (
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
                                <span className="ml-1">{handle}</span>
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
                            {visitor.tags.map((tag) => (
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
                                                {selectedVisitor.tags.map((tag) => (
                                                  <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                  </Badge>
                                                ))}
                                              </div>
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
                                              {selectedVisitor.interests.map((interest) => (
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
                                                    <span className="font-medium mr-2">{handle}</span>
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
                                                {selectedVisitor.purchaseHistory.map((purchase, index) => (
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
                                                      .reduce((sum, item) => sum + item.amount, 0)
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

