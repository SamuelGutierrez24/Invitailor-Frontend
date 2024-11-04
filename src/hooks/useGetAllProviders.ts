import { useState, useEffect } from 'react';
import { ServicesService } from '@/services/services.service';

export const useGetAllProviders = () => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const providersService = new ServicesService("https://invitailor.onrender.com");
            try {
                const providersData = await providersService.getProviders();
                setProviders(providersData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    return { providers, loading, error };
};