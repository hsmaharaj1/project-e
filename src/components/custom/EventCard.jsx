import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EventCard() {
  return (
    <Card className="max-w-sm">
      <Link href="#" className="group block overflow-hidden rounded-lg" prefetch={false}>
        <img
          src="/placeholder.svg"
          width={400}
          height={500}
          alt="Event Image"
          className="h-80 w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </Link>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div>Hiking Adventure</div>
            <div className="flex items-center gap-1">
              <UsersIcon className="h-4 w-4" />
              <span>12+</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold">
            <Link href="#" className="hover:underline" prefetch={false}>
              Explore the Redwood Forest
            </Link>
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarIcon className="h-4 w-4" />
            <span>June 15, 2024</span>
            <LocateIcon className="h-4 w-4" />
            <span>Redwood National Park</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Join us on an unforgettable adventure through the majestic Redwood Forest.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <Button>Join Event</Button>
        <Button variant="ghost" size="sm">
          <ShareIcon className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}


function ShareIcon(props) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}


function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}