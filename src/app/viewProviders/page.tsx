'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './viewProviders.css';
import { useGetAllProviders } from '@/hooks/useGetAllProviders';

export default function ProvidersPage() {
    const [filter, setFilter] = useState('');
    const router = useRouter();
    const { providers, loading, error } = useGetAllProviders();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleAddProvider = () => {
        router.push('/createProvider');
    };

    const filteredProviders = providers.filter(provider => provider.name.toLowerCase().includes(filter.toLowerCase()));

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error loading providers</div>;

    return (
        <div className="providers-page-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item">
                        <span className="icon">🔧</span> Providers
                    </button>
                    <button className="menu-item">
                        <span className="icon">➕</span> Create Event
                    </button>
                    <button className="menu-item">
                        <span className="icon">📅</span> My Events
                    </button>
                </div>
                <div className="spacer"></div>
                <button className="logout-button">
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <h1 className="title">Proveedores Disponibles</h1>
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
                                    <button onClick={() => router.push(`/provider/${provider.id}`)} className="view-provider-button">View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}