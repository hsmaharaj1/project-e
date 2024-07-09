import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Navbar from "./Navbar";

export default function AddEvent() {
    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [eventDate, setEventDate] = useState(null);
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");
    const [budget, setBudget] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const [description, setDescription] = useState("");
    const [err, setErr] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/events/addevent",
                { eventName, description, location, notes, groupSize, eventDate, category, budget },
                { withCredentials: true }
            );
            console.log("Event added:", data);
            if (data.success) {
                navigate("/explore")
            } else {
                setErr(data.message)
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex w-screen justify-center">
                <Card className="w-full text-left max-w-md my-10">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Add New Event</CardTitle>
                            <CardDescription>Fill out the details for your new event.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Event Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter event name"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="About the event"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="Enter location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="date">Date</Label>
                                <div className="flex items-center">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !eventDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={eventDate}
                                                onSelect={setEventDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={category}
                                    onValueChange={(value) => setCategory(value)}
                                >
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="social">Social</SelectItem>
                                        <SelectItem value="work">Work</SelectItem>
                                        <SelectItem value="family">Family</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Enter any additional notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="budget">Budget</Label>
                                    <Select
                                        value={budget}
                                        onValueChange={(value) => setBudget(value)}
                                    >
                                        <SelectTrigger id="budget">
                                            <SelectValue placeholder="Select budget range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-100">$0 - $100</SelectItem>
                                            <SelectItem value="101-500">$101 - $500</SelectItem>
                                            <SelectItem value="501-1000">$501 - $1,000</SelectItem>
                                            <SelectItem value="1001-5000">$1,001 - $5,000</SelectItem>
                                            <SelectItem value="5001-10000">$5,001 - $10,000</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="group-size">Group Size</Label>
                                    <Input
                                        id="group-size"
                                        type="number"
                                        placeholder="Enter group size"
                                        value={groupSize}
                                        onChange={(e) => setGroupSize(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row justify-between">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit" className="ml-auto">
                                Save Event
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}
