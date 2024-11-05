import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './homeProvider.css';
import { useServiceByProviderId } from "@/hooks/useServiceByProviderId";
import { useLogout } from '@/hooks/useLogout';



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
    const [filter, setFilter] = useState('');
    const router = useRouter();
    const providerId = getUserIdFromCookie('currentUser');
    const { services: servicesData, loading, error } = useServiceByProviderId(providerId || '');

    const services = servicesData || [];

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleAddEvent = () => {
        router.push('/createService');
    };

    const handleCreateService = () => {
        router.push('/createService');
    };

    const handleHome = () => {
        router.push('/home');
    }

    const { logout } = useLogout()

    const handleLogout = () => {
        logout();
        router.push('/')
    }

    const filteredEvents = services.filter(service => service.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="host-home-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item" onClick={handleCreateService}>
                        <span className="icon">➕</span> Create Service
                    </button>
                    <button className="menu-item" onClick={handleHome}>
                        <span className="icon">🛠️</span> My Services
                    </button>
                </div>
                <div className="spacer"></div>
                <button className="logout-button" onClick={handleLogout}>
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>Provider Home</h1>
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
                        <button onClick={handleAddEvent} className="add-event-button">Create Service</button>
                    </div>
                    <div className="events-container">
                        <ul className="events-list">
                            {filteredEvents.map(service => (
                                <li key={service.id} className="event-item">
                                    <h2>{service.name}</h2>
                                    <p>{service.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}