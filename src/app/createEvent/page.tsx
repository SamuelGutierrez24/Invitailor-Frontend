'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './createEvent.css';
import { useCreateEvent } from '@/hooks/useCreateEvent';
import { useGetAllProviders } from '@/hooks/useGetAllProviders';

export default function CreateEventPage() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const [dateTime, setDateTime] = useState('');
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [image, setImage] = useState<File | null>(null);
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
        if (image) {
            const success = await createEvent(eventName, eventDescription, location, price, dateTime, selectedServices, image);
            if (success) {
                alert('Event Created Successfully!');
                router.push('/home');
            } else {
                alert('Failed to create event');
            }
        } else {
            alert('Please select an image for the event');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error loading page</div>;

    return (
        <div className="create-event-page-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item" onClick={() => router.push('/viewProviders')}>
                        <span className="icon">🔧</span> Providers
                    </button>
                    <button className="menu-item" onClick={() => router.push('/createEvent')}>
                        <span className="icon">➕</span> Create Event
                    </button>
                    <button className="menu-item" onClick={() => router.push('/home')}>
                        <span className="icon">📅</span> Home / My Events
                    </button>
                </div>
                <div className="spacer"></div>
                <button className="logout-button" onClick={() => router.push('/logout')}>
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
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateTime">Date and Time</label>
                        <input
                            type="datetime-local"
                            id="dateTime"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
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
                    <div className="form-group">
                        <label htmlFor="image">Event Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Create Event</button>
                </form>
            </main>
        </div>
    );
}
