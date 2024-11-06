import React, { useState } from 'react';
import './homeAttendant.css';
import { useGetAllEvents } from '@/hooks/useGetAllEvents';
import { useRouter } from 'next/navigation';

export default function AttendantHomePage() {
    const [filter, setFilter] = useState('');
    const { events: eventsData, loading, error } = useGetAllEvents();
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
        router.push(`/viewEventAttendant?id=${eventId}`);
    };

    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(filter.toLowerCase()));

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
                <button className="logout-button">
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>Attendant Home</h1>
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
                                <li key={event.id} className="event-item">
                                    <div className="event-details">
                                        <h2>{event.name}</h2>
                                        <p>{event.description}</p>
                                    </div>
                                    <button onClick={() => handleViewEvent(event.id)} className="view-event-button">View Event</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}