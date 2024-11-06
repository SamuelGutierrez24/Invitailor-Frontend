'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEventById } from "@/hooks/useEventById";
import { useDeleteEvent } from "@/hooks/useDeleteEvent";
import { useLogout } from '@/hooks/useLogout';
import { Event } from "@/interfaces/event";
import './viewEvent.css';
import Sidebar from "@/components/Sidebar/hostSidebar";

export default function ViewEventPage() {
    const [eventId, setEventId] = useState("");
    const [event, setEvent] = useState<Event | null>(null);
    const router = useRouter();
    const { fetchEvent } = useEventById();
    const { deleteEvent } = useDeleteEvent();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const eventIdParam = searchParams.get('id');
        if (eventIdParam) {
            setEventId(eventIdParam);
        }
    }, []);

    useEffect(() => { 
        if (eventId) { 
            const getEvent = async () => { 
                const fetchedEvent = await fetchEvent(eventId);
                setEvent(fetchedEvent); 
            };
            getEvent(); 
        } 
    }, [eventId, fetchEvent]);

    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
        router.push('/')
    };

    const handleViewProviders = () => {
        router.push('/viewProviders');
    };

    const handleAddEvent = () => {
        router.push('/createEvent');
    };

    const handleHome = () => {
        router.push('/home');
    };

    const handleEditEvent = (eventId: string) => {
        router.push(`/editEvent?id=${eventId}`)
    }

    const handleDeleteEvent = async (eventId: string) => {
        try { 
            await deleteEvent(eventId); 
            router.push('/home');
            alert('Event deleted successfully!'); 
        } catch (error) { 
            console.error('Error deleting event:', error); 
            alert('Failed to delete event'); 
        }
    };

    return (
        <div className="host-home-container">
                <Sidebar />
            <main className="main-content">
                <header className="header">
                    <h1>Event</h1>
                </header>
                <div className="events-container">
                    {event ? (
                        <>
                            <button className="button button-edit" onClick={() => handleEditEvent(event.id)}>Edit</button>
                            <button className="button button-delete" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                            <h2>{event.name}</h2>
                            <div className="event-details">
                                <div className="event-info">
                                    <p><strong>Description:</strong> {event.description}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <p><strong>Price:</strong> ${event.price}</p>
                                    <p><strong>Date and Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
                                </div>
                                {event.url_image && <img src={event.url_image} alt={event.name} className="event-image" />}
                            </div>
                        </>
                    ) : (
                        <p>Loading event details...</p>
                    )}
                </div>
            </main>
        </div>
    );
}
