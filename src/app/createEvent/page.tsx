"use client";
import React, { useState } from 'react';
import './createEvent.css';
import { useCreateEvent } from '@/hooks/useCreateEvent';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const { createEvent } = useCreateEvent();
    const router = useRouter();

    const handleServiceToggle = (serviceId: number) => {
        setSelectedServices(prevSelectedServices =>
            prevSelectedServices.includes(serviceId)
                ? prevSelectedServices.filter(id => id !== serviceId)
                : [...prevSelectedServices, serviceId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await createEvent(eventName, eventDescription, selectedServices);
        if (success) {
            alert('Event Created Successfully!');
            router.push('/events'); // Redirige a la página de eventos o a la página deseada
        } else {
            alert('Failed to create event');
        }
    };

    return (
        <div className="create-event-container">
            <h1>Create Event</h1>
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
                <button onClick={handleSubmit} className="submit-button">Create Event</button>
        </div>
    );
}