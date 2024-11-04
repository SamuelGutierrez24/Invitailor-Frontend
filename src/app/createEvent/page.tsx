"use client";
import React, { useState } from 'react';
import './createEvent.css';
import { useCreateEvent } from '@/hooks/useCreateEvent';
import { useGetAllProviders } from '@/hooks/useGetAllProviders';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/useLogout';

export default function CreateEventPage() {
    const [filter, setFilter] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const { createEvent } = useCreateEvent();
    const router = useRouter();
    const { providers, loading, error } = useGetAllProviders();

    const handleServiceToggle = (serviceId: number) => {
        setSelectedServices(prevSelectedServices =>
            prevSelectedServices.includes(serviceId)
                ? prevSelectedServices.filter(id => id !== serviceId)
                : [...prevSelectedServices, serviceId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(selectedServices)
        const success = await createEvent(eventName, eventDescription, selectedServices);
        if (success) {
            alert('Event Created Successfully!');
            router.push('/home');
        } else {
            alert('Failed to create event');
        }
    };

    const { logout } = useLogout()

    const handleLogout = () => {
        logout();
        router.push('/')
    }

    const handleViewProviders = () => {
        router.push('/viewProviders');
    }

    const handleAddEvent = () => {
        router.push('/createEvent');
    };

    const handleHome = () => {
        router.push('/home');
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const filteredServices = providers.filter(service => service.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="create-event-page-container">
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
                <button className="logout-button" onClick={handleLogout}>
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <h1>Create Event</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="eventName">Event Name</label>
                        <input
                            type="text"
                            id="eventName"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventDescription">Event Description</label>
                        <textarea
                            id="eventDescription"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventProviders">Select Providers</label>
                        <div className="providers-list">
                            {providers.map(provider => (
                                <div key={provider.id} className="provider-item">
                                    <input
                                        type="checkbox"
                                        id={`provider-${provider.id}`}
                                        checked={selectedServices.includes(provider.id)}
                                        onChange={() => handleServiceToggle(provider.id)}
                                    />
                                    <label htmlFor={`provider-${provider.id}`}>{provider.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Create Event</button>
                </form>
            </main>
        </div>
    );
}