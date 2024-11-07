'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './createService.css';
import { useCreateService } from '@/hooks/useCreateService';
import { useLogout } from '@/hooks/useLogout';
import Sidebar from '@/components/Sidebar/providerSidebar';

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

    return (
        <div className="create-service-page-container">
            <Sidebar />
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
                                onChange={(e) => setPrice(Number(e.target.value))}
                                required
                            />
                        </div>
                        <button id='create' type="submit" className="submit-button">Create Service</button>
                    </form>
                </div>
            </main>
        </div>
    );
}