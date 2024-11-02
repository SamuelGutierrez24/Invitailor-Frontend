import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './homeHost.css';

const eventsData = [
    { id: 1, name: 'Event 1', description: 'Description of Event 1' },
    { id: 2, name: 'Event 2', description: 'Description of Event 2' },
    // Agrega más eventos aquí
];

export default function HostHomePage() {
    const [events, setEvents] = useState(eventsData);
    const [filter, setFilter] = useState('');
    const router = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleAddEvent = () => {
        router.push('/createEvent');
    };

    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="host-home-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item">
                        <span className="icon">🔧</span> Providers
                    </button>
                    <button className="menu-item">
                        <span className="icon">➕</span> Create Event
                    </button>
                    <button className="menu-item">
                        <span className="icon">📅</span> My Events
                    </button>
                </div>
                <div className="spacer"></div>
                <button className="logout-button">
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>Host Home</h1>
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
                        <button onClick={handleAddEvent} className="add-event-button">Create Event</button>
                    </div>
                    <div className="events-container">
                        <ul className="events-list">
                            {filteredEvents.map(event => (
                                <li key={event.id} className="event-item">
                                    <h2>{event.name}</h2>
                                    <p>{event.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}