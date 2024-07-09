import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function UpdateProfile() {
    const [selectedInterests, setSelectedInterests] = useState([])
    const [avatar, setAvatar] = useState(null)
    const [date, setDate] = useState(null)
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [gender, setGender] = useState("")

    const interests = ["Travel", "Reading", "Cooking", "Photography", "Music", "Sports"]

    const handleInterestClick = (interest) => {
        setSelectedInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        )
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setAvatar(URL.createObjectURL(file))
        }
    }

    const handleGenderChange = (value) => {
        setGender(value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleBioChange = (e) => {
        setBio(e.target.value)
    }

    return (
        <Card className="w-full max-w-md text-left">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    {avatar ? <AvatarImage src={avatar} alt="Profile" /> : <AvatarFallback>JD</AvatarFallback>}
                </Avatar>
                <input
                    type="file"
                    accept="image/*"
                    id="avatar-upload"
                    className="hidden"
                    onChange={handleAvatarChange}
                />
                <div className="flex-1 space-y-1">
                    <Input onChange={handleNameChange} id="name" placeholder="Enter your name" className="text-lg font-medium" />
                </div>
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon" className="ml-auto" onClick={() => document.getElementById('avatar-upload').click()}>
                        <CameraIcon className="h-5 w-5" />
                        <span className="sr-only">Update photo</span>
                    </Button>
                </div>
            </div>
            <CardContent className="space-y-6 p-6">
                <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea onChange={handleBioChange} id="bio" placeholder="Tell us a bit about yourself..." className="min-h-[100px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <div className="flex items-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select id="gender" onValueChange={handleGenderChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter your location" />
                </div>
                <div className="grid gap-2">
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                            <Button
                                key={interest}
                                variant={selectedInterests.includes(interest) ? "solid" : "outline"}
                                size="sm"
                                onClick={() => handleInterestClick(interest)}
                            >
                                {interest}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}

function CameraIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
        </svg>
    )
}
