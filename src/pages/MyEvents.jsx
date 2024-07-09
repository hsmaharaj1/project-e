import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/custom/Navbar';
import MyEventCard from '@/components/custom/MyEventCard';

function MyEvents() {
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/events/createdevents",
                    { withCredentials: true }
                );
                if (data.success) {
                    setEvents(data.futureEvents);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("An error occurred while fetching events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            {/* <MyEventCard/> */}
            <div className='w-screen flex flex-col justify-center'>
                <h1>My Events</h1>
                {events && events.length > 0 ? (
                    <ul className='flex flex-col gap-4 justify-center items-center'>
                        {events.map(event => (
                            <li className='w-[18rem]' key={event._id}>
                                <MyEventCard
                                    eventName={event.eventName}
                                    description={event.description}
                                    eventDate={new Date(event.eventDate).toLocaleDateString()}
                                    onDelete={()=>console.log("Deleting")}
                                    type="myevent"
                                />
                                {/* {event.eventName} : {event.description} - {new Date(event.eventDate).toLocaleDateString()} */}
                            </li>

                        ))}
                    </ul>
                ) : (
                    <p>No upcoming events found.</p>
                )}
            </div>

        </>
    );
}

export default MyEvents;
