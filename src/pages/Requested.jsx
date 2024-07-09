import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/custom/Navbar'
import MyEventCard from '@/components/custom/MyEventCard'

function Requested() {
    const [events, setEvents] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const requestedEvents = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/events/requestedevents",
                    { withCredentials: true }
                )
                if (data.success) {
                    setEvents(data.futureEvents)
                } else {
                    setError(data.message)
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        requestedEvents()

    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <Navbar />
            <h1>Requested Events</h1>

            {events && events.length > 0 ?
                (
                    <ul className='flex flex-col gap-4 justify-center items-center'>
                        {events.map(event => (
                            <li className='w-[18rem]' key={event._id}>
                                <MyEventCard
                                    eventName={event.eventName}
                                    description={event.description}
                                    eventDate={new Date(event.eventDate).toLocaleDateString()}
                                    onDelete={() => console.log("Deleting")}
                                    type="requested"
                                />
                            </li>

                        ))}
                    </ul>
                )

                : (
                    <p>No Upcoming Events</p>
                )
            }

        </div>
    )
}

export default Requested
