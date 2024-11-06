'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './viewProviders.css';
import { useGetAllProviders } from '@/hooks/useGetAllProviders';
import Sidebar from '@/components/Sidebar/hostSidebar';

export default function ProvidersPage() {
    const [filter, setFilter] = useState('');
    const router = useRouter();
    const { providers, loading, error } = useGetAllProviders();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleViewService = (serviceId: string) => {
        router.push(`/viewService?id=${serviceId}`)
    }

    const filteredProviders = providers.filter(provider => provider.name.toLowerCase().includes(filter.toLowerCase()));

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error loading providers</div>;

    return (
        <div className="providers-page-container">
            <Sidebar />
            <main className="main-content">
                <h1 className="title">Available providers</h1>
                <header className="header">
                    <input 
                        type="text" 
                        value={filter} 
                        onChange={handleFilterChange} 
                        placeholder="Filter providers" 
                        className="filter-input"
                    />
                </header>
                <section className="content">
                    <div className="providers-container">
                        <ul className="providers-list">
                            {filteredProviders.map(provider => (
                                <li key={provider.id} className="provider-item">
                                    <div className="provider-details">
                                        <h2>{provider.name}</h2>
                                        <p>{provider.description}</p>
                                    </div>
                                    <button onClick={() => handleViewService(provider.id)} className="view-provider-button">View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}