import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './homeProvider.css';
import { useServiceByProviderId } from "@/hooks/useServiceByProviderId";
import { useLogout } from '@/hooks/useLogout';
import Sidebar from '@/components/Sidebar/providerSidebar';



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

export default function ProviderHomePage() {
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

    const handleViewService = (serviceId: string) => {
        router.push(`/viewService?id=${serviceId}`)
    }

    const filteredEvents = services.filter(service => service.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="host-home-container">
            <Sidebar />
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
                        <button id='createService' onClick={handleAddEvent} className="add-event-button">Create Service</button>
                    </div>
                    <div className="events-container">
                        <ul id='eventList' className="events-list">
                            {filteredEvents.map(service => (
                                <li key={service.id} className="event-item" id={`service-${service.id}`}>
                                    <h2>{service.name}</h2>
                                    <button id={`view-${service.id}`} className='service-button' onClick={() => handleViewService(service.id)}>View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}