import { useState, useEffect } from 'react';
import { EventsService } from '@/services/events.service';
import { Event } from '@/interfaces/event';

export const useGetAllEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsService = new EventsService("https://invitailor.onrender.com");
            try {
                const eventsData = await eventsService.getEvents();
                setEvents(eventsData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return { events, loading, error };
};