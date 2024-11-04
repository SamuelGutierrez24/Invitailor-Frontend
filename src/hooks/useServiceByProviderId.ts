import { useState, useEffect } from 'react';
import { ServicesService } from '@/services/services.service'; // Ajusta la ruta según tu estructura de proyecto

export const useServiceByProviderId = (providerId: string) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            const servicesService = new ServicesService("https://invitailor.onrender.com");
            try {
                const servicesData = await servicesService.getServicesByProviderId(providerId);
                setServices(servicesData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [providerId]);

    return { services, loading, error };
};