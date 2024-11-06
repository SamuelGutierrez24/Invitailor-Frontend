'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEventById } from "@/hooks/useEventById";
import { useLogout } from '@/hooks/useLogout';
import { Event } from "@/interfaces/event";
import './viewEvent.css';

export default function ViewEventPage() {
    const [eventId, setEventId] = useState("");
    const [event, setEvent] = useState<Event | null>(null);
    const router = useRouter();
    const { fetchEvent } = useEventById();

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

    return (
        <div className="host-home-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item" onClick={handleViewProviders}>
                        <span className="icon">🔧</span> Providers
                    </button>
                    <button className="menu-item" onClick={handleAddEvent}>
                        <span className="icon">➕</span> Create Event
                    </button>
                    <button className="menu-item" onClick={handleHome}>
                        <span className="icon">📅</span> Home / My Events
                    </button>
                </div>
                <div className="spacer"></div>
                <button onClick={handleLogout} className="logout-button">
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>Host Home</h1>
                </header>
                <div className="events-container">
                    {event ? (
                        <>
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