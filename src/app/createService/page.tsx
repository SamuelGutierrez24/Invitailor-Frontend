'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './createService.css';
import { useCreateService } from '@/hooks/useCreateService';
import { useLogout } from '@/hooks/useLogout';

export default function CreateServicePage() {
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [price, setPrice] = useState(1);
    const { createService } = useCreateService();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await createService(serviceName, serviceDescription, price);
        if (success) {
            alert('Service Created Successfully!');
            router.push('/home');
        } else {
            alert('Failed to create Service');
        }
    };

    const { logout } = useLogout()

    const handleLogout = () => {
        logout();
        router.push('/')
    }


    return (
        <div className="create-service-page-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item" onClick={() => router.push('/createService')}>
                        <span className="icon">➕</span> Create Service
                    </button>
                    <button className="menu-item" onClick={() => router.push('/home')}>
                        <span className="icon">📅</span> Home / My Services
                    </button>
                </div>
                <div className="spacer"></div>
                <button className="logout-button" onClick={handleLogout}>
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <h1>Create Service</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="serviceName">Service Name</label>
                            <input
                                type="text"
                                id="serviceName"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="serviceDescription">Service Description</label>
                            <textarea
                                id="serviceDescription"
                                value={serviceDescription}
                                onChange={(e) => setServiceDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Create Service</button>
                    </form>
                </div>
            </main>
        </div>
    );
}