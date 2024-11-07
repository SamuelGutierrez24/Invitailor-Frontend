import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './homeHost.css';
import { useEventsByHostId } from "@/hooks/useEventsByHostId";
import { useLogout } from '@/hooks/useLogout';
import Sidebar from '@/components/Sidebar/hostSidebar';
import { setFilter } from '../../store/eventSlice/event.slice';
import { useDispatch, useSelector } from 'react-redux';



function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

function getUserIdFromCookie(cookieName: string): string | null {
    const cookieValue = getCookie(cookieName);
    if (cookieValue) {
        try {
            const decodedValue = decodeURIComponent(cookieValue);
            const cookieObject = JSON.parse(decodedValue);
            return cookieObject.id || null;
        } catch (error) {
            console.error('Error parsing cookie:', error);
            return null;
        }
    }
    return null;
}

export default function HostHomePage() {
    const dispatch = useDispatch();
    const [filter, setLocalFilter] = useState('');
    const router = useRouter();
    const hostId = getUserIdFromCookie('currentUser');
    const { events: eventsData, loading, error } = useEventsByHostId(hostId || '');

    const events = eventsData || [];

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalFilter(value);
        dispatch(setFilter(value));
    };

    /*const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };*/

    const handleAddEvent = () => {
        router.push('/createEvent');
    };

    

    const handleViewEvent = (eventId: string) => {
        router.push(`/viewEvent?id=${eventId}`)
    }


    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="host-home-container">
            <Sidebar />
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
                                    <button className='service-button' onClick={() => handleViewEvent(event.id)}>View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}

