'use client'

import React, { useState } from 'react';
import { useGetRegisteredEvents } from '@/hooks/useGetRegisteredEvents';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar/attendantSidebar';

export default function Tickets() {
    const [filter, setFilter] = useState('');
    const { events: eventsData, loading, error } = useGetRegisteredEvents();
    const events = eventsData || [];
    const router = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleViewEvent = (eventId: string) => {
        router.push(`/viewRegisteredEvent?id=${eventId}`);
    };

    const filteredEvents = events.filter(event => event.event.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="attendant-home-container">
            <Sidebar />
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