import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical } from 'lucide-react';

export default function MyEventCard(props) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1 text-left">
                    <CardTitle>{props.eventName}</CardTitle>
                    <CardDescription>{props.eventDate}</CardDescription>
                    <CardDescription>{props.description}</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-2">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {props.type === "myevent" ? (
                            <>
                                <DropdownMenuItem>
                                    <FilePenIcon className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={props.onDelete}>
                                    <TrashIcon className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem >
                                    <TrashIcon className="mr-2 h-4 w-4" />
                                    Cancel
                                </DropdownMenuItem>
                            </>
                        )}

                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
        </Card>
    )
}

function FilePenIcon(props) {
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
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    )
}

function TrashIcon(props) {
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
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}