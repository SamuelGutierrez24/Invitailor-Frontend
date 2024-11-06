'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useServiceById } from "@/hooks/useServiceById";
import { useDeleteService } from "@/hooks/useDeleteService";
import { Service } from "@/interfaces/service";
import './viewService.css';
import HostSidebar from '@/components/Sidebar/hostSidebar';
import ProviderSidebar from '@/components/Sidebar/providerSidebar';

export default function ViewServicePage() {
    const [serviceId, setServiceId] = useState("");
    const [service, setService] = useState<Service | null>(null);
    const router = useRouter();
    const { fetchService } = useServiceById();
    const { deleteService } = useDeleteService();
    const userRole = getUserRoleFromCookie('currentUser');

    function getCookie(name: string): string | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    }

    function getUserRoleFromCookie(cookieName: string): string | null {
        const cookieValue = getCookie(cookieName);
        if (cookieValue) {
            try {
                const decodedValue = decodeURIComponent(cookieValue);
                const cookieObject = JSON.parse(decodedValue);
                if (Array.isArray(cookieObject.roles)) {
                    return cookieObject.roles.join(', ');
                }
                return cookieObject.roles || null;
            } catch (error) {
                console.error('Error parsing cookie:', error);
                return null;
            }
        }
        return null;
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const serviceIdParam = searchParams.get('id');
        if (serviceIdParam) {
            setServiceId(serviceIdParam);
        }
    }, []);

    useEffect(() => { 
        if (serviceId) { 
            const getService = async () => { 
                const fetchedService = await fetchService(serviceId);
                setService(fetchedService); 
            };
            getService(); 
        } 
    }, [serviceId, fetchService]);


    const handleEditService = (serviceId: string) => {
        router.push(`/editService?id=${serviceId}`)
    }

    const handleDeleteService = async (serviceId: string) => {
        try { 
            await deleteService(serviceId); 
            router.push('/home');
            alert('Service deleted successfully!'); 
        } catch (error) { 
            console.error('Error deleting service:', error); 
            alert('Failed to delete service'); 
        }
    };

    return (
        <div className="host-home-container">
            {userRole === 'host' ? <HostSidebar /> : <ProviderSidebar />}
            <main className="main-content">
                <header className="header">
                    <h1>Provider Home</h1>
                </header>
                <div className="services-container">
                    {service ? (
                        <>
                            {userRole !== 'host' && (
                                <>
                                    <button className="button button-edit" onClick={() => handleEditService(service.id)}>Edit</button>
                                    <button className="button button-delete" onClick={() => handleDeleteService(service.id)}>Delete</button>
                                </>
                            )}
                            <h2>{service.name}</h2>
                            <div className="service-details">
                                <p><strong>Description:</strong> {service.description}</p>
                                <p><strong>Price:</strong> ${service.price}</p>
                            </div>
                        </>
                    ) : (
                        <p>Loading service details...</p>
                    )}
                </div>
            </main>
        </div>
    );
}
