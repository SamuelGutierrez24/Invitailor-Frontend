"use client";
import React, { useState } from 'react';
import './createEvent.css';
import { useCreateEvent } from '@/hooks/useCreateEvent';
import { useRouter } from 'next/navigation';

const servicesData = [
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
    // Agrega más servicios aquí
];

export default function CreateEventPage() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [filter, setFilter] = useState('');
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const { createEvent } = useCreateEvent();
    const router = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleServiceToggle = (serviceId: number) => {
        setSelectedServices(prevSelectedServices =>
            prevSelectedServices.includes(serviceId)
                ? prevSelectedServices.filter(id => id !== serviceId)
                : [...prevSelectedServices, serviceId]
        );
    };

    const handleSubmit = async() => {
        if (eventName && eventDescription) {
            try {
                const event = await createEvent(eventName, eventDescription);
                alert("Event created!");
                router.push("/home");
            } catch (error) {
                alert("Event creation failed. Please try again.");
            }
        } else {
            alert("Please fill in all fields");
        }
    };

    const filteredServices = servicesData.filter(service =>
        service.name.toLowerCase().includes(filter.toLowerCase())
    );

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
                <div className="form-group">
                    <label htmlFor="serviceFilter">Filter Services</label>
                    <input
                        type="text"
                        id="serviceFilter"
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="services-list">
                    {filteredServices.map(service => (
                        <div key={service.id} className="service-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedServices.includes(service.id)}
                                    onChange={() => handleServiceToggle(service.id)}
                                />
                                {service.name}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="submit-button" onClick={handleSubmit}>Create Event</button>
        </div>
    );
}