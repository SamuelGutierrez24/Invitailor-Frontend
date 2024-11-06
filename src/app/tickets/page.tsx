'use client'

import React, { useState } from 'react';
import { useGetRegisteredEvents } from '@/hooks/useGetRegisteredEvents';
import { useRouter } from 'next/navigation';

export default function Tickets() {
    const [filter, setFilter] = useState('');
    const { events: eventsData, loading, error } = useGetRegisteredEvents();
    const events = eventsData || [];
    const router = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleViewTickets = () => {
        router.push('/tickets');
    };

    const handleHome = () => {
        router.push('/home');
    };

    const handleViewEvent = (eventId: string) => {
        router.push(`/viewRegisteredEvent?id=${eventId}`);
    };

    const handleLogout = () => {
        router.push('/');
    }

    const filteredEvents = events.filter(event => event.event.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="attendant-home-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item" onClick={handleViewTickets}>
                        <span className="icon">🎟️</span> My Tickets
                    </button>
                    <button className="menu-item" onClick={handleHome}>
                        <span className="icon">📅</span> Events / Home
                    </button>
                </div>
                <div className="spacer"></div>
                <button className="logout-button" onClick={handleLogout}>
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>My Tickets</h1>
                </header>
                <section className="content">
                    <div className="actions">
                        <input 
                            type="text" 
                            placeholder="Filter events" 
                            value={filter} 
                            onChange={handleFilterChange} 
                            className="filter-input"
                        />
                    </div>
                    <div className="events-container">
                        <ul className="events-list">
                            {filteredEvents.map(event => (
                                <li key={event.event.id} className="event-item">
                                    <div className="event-details">
                                        <h2>{event.event.name}</h2>
                                        <p>{event.event.description}</p>
                                    </div>
                                    <button onClick={() => handleViewEvent(event.event.id)} className="view-event-button">View Event</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}