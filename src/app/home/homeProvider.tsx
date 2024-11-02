import React, { useState } from 'react';
import { useLogout } from '@/hooks/useLogout'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import './homeProvider.css';

const servicesData = [
    { id: 1, name: 'Service 1', description: 'Description of Service 1' },
    { id: 2, name: 'Service 2', description: 'Description of Service 2' },
    // Agrega más servicios aquí
];

export default function ProviderHomePage() {
    const [services, setServices] = useState(servicesData);
    const [filter, setFilter] = useState('');
    const { logout } = useLogout();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleAddService = () => {
        const newService = { id: services.length + 1, name: `Service ${services.length + 1}`, description: `Description of Service ${services.length + 1}` };
        setServices([...services, newService]);
    };

    return (
        <div className="provider-home-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item">
                        <span className="icon">🔧</span> Service
                    </button>
                </div>
                <div className="spacer"></div>
                <button className="logout-button" onClick={logout}>
                    <span className="icon">🚪</span> Log Out
                </button>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>Provider Home</h1>
                </header>
                <section className="content">
                    <div className="actions">
                        <input 
                            type="text" 
                            placeholder="Filter services" 
                            value={filter} 
                            onChange={handleFilterChange} 
                            className="filter-input"
                        />
                        <button onClick={handleAddService} className="add-button">Add Service</button>
                    </div>
                    <div className="services-container">
                        <ul className="services-list">
                            {services.filter(service => service.name.toLowerCase().includes(filter.toLowerCase())).map(service => (
                                <li key={service.id} className="service-item">
                                    <h2>{service.name}</h2>
                                    <p>{service.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}