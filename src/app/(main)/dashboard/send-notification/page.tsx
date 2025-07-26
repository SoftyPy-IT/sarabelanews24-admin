/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Send } from "lucide-react"
import SubscriberList from "./_components/SubscriberList"

export default function NotificationDashboard() {
  const [subscribers, setSubscribers] = useState([])
  const [notification, setNotification] = useState({
    title: "SarabelaNews24 Update",
    body: "Check out our latest news!",
    url: "/",
  })

  // Send notification to all subscribers
  const sendToAll = async () => {
    try {
      const response = await fetch("/api/admin/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      })

      if (response.ok) {
        alert("Notification sent to all subscribers!")
      } else {
        alert("Failed to send notification")
      }
    } catch (error) {
      console.error("Error sending notification:", error)
      alert("Error sending notification")
    }
  }





  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Send Push Notification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={notification.title}
                onChange={(e) => setNotification({ ...notification, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                value={notification.body}
                onChange={(e) => setNotification({ ...notification, body: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL (where to redirect)</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={notification.url}
                onChange={(e) => setNotification({ ...notification, url: e.target.value })}
              />
            </div>
            <Button onClick={sendToAll} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send to All Subscribers
            </Button>
          </div>
        </CardContent>
      </Card>

      <SubscriberList/>
    </div>
  )
}

