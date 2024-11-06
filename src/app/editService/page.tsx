'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './editService.css';
import { useEditService } from '@/hooks/useEditService';
import { useServiceById } from '@/hooks/useServiceById';
import { Service } from "@/interfaces/service";

export default function EditServicePage() {
    const router = useRouter();
    const [service, setService] = useState<Service | null>(null);
    const { fetchService } = useServiceById();
    const { editService } = useEditService();

    const [serviceId, setServiceId] = useState<string | null>(null);
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        async function loadServiceData() {
            const searchParams = new URLSearchParams(window.location.search);
            const serviceIdParam = searchParams.get('id');
            if (serviceIdParam) {
                setServiceId(serviceIdParam);
                const fetchedService = await fetchService(serviceIdParam);
                setService(fetchedService);
                setServiceName(fetchedService.name);
                setServiceDescription(fetchedService.description);
                setPrice(fetchedService.price);
            }
        }

        if (!hasLoaded) {
            loadServiceData();
            setHasLoaded(true);
        }
    }, [hasLoaded, fetchService]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (serviceId) {
            const success = await editService(serviceId, serviceName, serviceDescription, price);
            console.log(serviceName)
            if (success) {
                alert('Service edited Successfully!');
                router.push('/home');
            } else {
                alert('Failed to create service');
            }
        }
    };

    return (
        <div className="create-service-page-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item" onClick={() => router.push('/viewProviders')}>
                        <span className="icon">🔧</span> Providers
                    </button>
                    <button className="menu-item" onClick={() => router.push('/createService')}>
                        <span className="icon">➕</span> Create Service
                    </button>
                    <button className="menu-item" onClick={() => router.push('/home')}>
                        <span className="icon">📅</span> Home / My Services
                    </button>
                </div>
                <div className="spacer"></div>
                <button className="logout-button" onClick={() => router.push('/logout')}>
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <h1>Edit Service</h1>
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
                    <button type="submit" className="submit-button">Edit Service</button>
                </form>
            </main>
        </div>
    );
}
