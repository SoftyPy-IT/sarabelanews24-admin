/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Send, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

const SubscriberList = () => {
    const [subscribers, setSubscribers] = useState([])
    console.log('all subscriber here show ', subscribers)
    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState({
        title: "SarabelaNews24 Update",
        body: "Check out our latest news!",
        url: "/",
    })

    // Fetch all subscribers
    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await fetch("/api/admin/subscribers")
                if (response.ok) {
                    const data = await response.json()
                    // Check the structure of your response data and adjust accordingly
                    setSubscribers(data.data?.subscribes || data.data || [])
                }
            } catch (error) {
                console.error("Error fetching subscribers:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSubscribers()
    }, [])

    // Send notification to a specific subscriber
    const sendToOne = async (id: any) => {
        try {
            const response = await fetch(`/api/admin/send-notification/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notification),
            })

            if (response.ok) {

                toast.success('Notification sent!')
            } else {

                toast.error('Failed to send notification!')
            }
        } catch (error) {
            console.error("Error sending notification:", error)
            toast.error("Error sending notification")
        }
    }

    // Delete a subscriber
    const deleteSubscriber = async (id: any) => {
        try {
            const response = await fetch(`/api/admin/subscribers/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setSubscribers(subscribers.filter((sub: any) => sub._id !== id))
                toast.success("Subscriber deleted!")
            } else {
                toast.error("Failed to delete subscriber")
            }
        } catch (error) {
            toast.error("Error deleting subscriber")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Subscribers ({subscribers.length})</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Loading subscribers...</p>
                ) : subscribers.length === 0 ? (
                    <p>No subscribers found.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Endpoint</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscribers.map((sub: any) => (
                                <TableRow key={sub._id}>
                                    <TableCell className="font-mono text-xs">{sub._id.substring(0, 8)}...</TableCell>
                                    <TableCell className="font-mono text-xs truncate max-w-[200px]">
                                        {sub.endpoint.substring(0, 30)}...
                                    </TableCell>
                                    <TableCell>{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => sendToOne(sub._id)}
                                                title="Send notification to this subscriber"
                                            >
                                                <Send className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => deleteSubscriber(sub._id)}
                                                title="Delete this subscriber"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};

export default SubscriberList;