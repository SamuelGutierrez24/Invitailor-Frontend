'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './editEvent.css';
import { useEditEvent } from '@/hooks/useEditEvent';
import { useGetAllProviders } from '@/hooks/useGetAllProviders';
import { useEventById } from '@/hooks/useEventById';
import { Event } from "@/interfaces/event";
import Sidebar from '@/components/Sidebar/hostSidebar';

export default function EditEventPage() {
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);
    const { fetchEvent } = useEventById();
    const { providers, loading, error } = useGetAllProviders();
    const { editEvent } = useEditEvent();

    const [eventId, setEventId] = useState<string | null>(null);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const [dateTime, setDateTime] = useState('');
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [removeImage, setRemoveImage] = useState(false);

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        async function loadEventData() {
            const searchParams = new URLSearchParams(window.location.search);
            const eventIdParam = searchParams.get('id');
            if (eventIdParam) {
                setEventId(eventIdParam);
                const fetchedEvent = await fetchEvent(eventIdParam);
                setEvent(fetchedEvent);
                setEventName(fetchedEvent.name);
                setEventDescription(fetchedEvent.description);
                setLocation(fetchedEvent.location);
                setPrice(fetchedEvent.price);
                setDateTime(fetchedEvent.dateTime);
            }
        }

        if (!hasLoaded) {
            loadEventData();
            setHasLoaded(true);
        }
    }, [hasLoaded, fetchEvent]);

    const handleServiceToggle = (serviceId: number) => {
        setSelectedServices(prevSelectedServices =>
            prevSelectedServices.includes(serviceId)
                ? prevSelectedServices.filter(id => id !== serviceId)
                : [...prevSelectedServices, serviceId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (eventId && image) {
            const success = await editEvent(eventId, eventName, eventDescription, location, price, dateTime, selectedServices, image);
            if (success) {
                alert('Event updated Successfully!');
                router.push('/home');
            } else {
                alert('Failed to create event');
            }
        } else {
            alert('Please select an image for the event');
        }
    };

    const handleRemoveImage = () => {
        setRemoveImage(true);
        setImage(null);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error loading page</div>;

    return (
        <div className="create-event-page-container">
            <Sidebar />
            <main className="main-content">
                <h1>Edit Event</h1>
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
                                        checked={selectedServices.includes(Number(provider.id))}
                                        onChange={() => handleServiceToggle(Number(provider.id))}
                                    />
                                    <label htmlFor={`provider-${provider.id}`}>{provider.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Event Image</label>
                        {event?.url_image && !removeImage && (
                            <div className="current-image">
                                <img src={event.url_image} alt={event.name} className="event-image" />
                                <button type="button" onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
                            </div>
                        )}
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                    <button type="submit" className="submit-button">Edit Event</button>
                </form>
            </main>
        </div>
    );
}
