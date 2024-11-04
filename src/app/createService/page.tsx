"use client";
import React, { useState } from 'react';
import './createService.css';
import { useCreateService } from '@/hooks/useCreateService';
import { useRouter } from 'next/navigation';

export default function CreateServicePage() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const { createService } = useCreateService();
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await createService(eventName, eventDescription, price);
        if (success) {
            alert('Service Created Successfully!');
            router.push('/home');
        } else {
            alert('Failed to create Service');
        }
    };

    return (
        <div className="create-event-container">
            <h1>Create Service</h1>
                <div className="form-group">
                    <label htmlFor="eventName">Service Name</label>
                    <input
                        type="text"
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDescription">Service Description</label>
                    <textarea
                        id="eventDescription"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ServicePrice">Service Price</label>
                    <input
                        id="ServicePrice"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        required
                        min="0"
                        step="1" // Puedes ajustar el step según la precisión que necesites
                    />
                </div>
                <button onClick={handleSubmit} className="submit-button">Create Service</button>
        </div>
    );
}