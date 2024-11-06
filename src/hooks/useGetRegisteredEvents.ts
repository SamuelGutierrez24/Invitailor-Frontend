import Cookies from "js-cookie";
import { TicketsService } from "@/services/tickets.service";
import { useState, useEffect } from "react";
import { Ticket } from "@/interfaces/ticket";

export const useGetRegisteredEvents = () => {
    const [events, setEvents] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsService = new TicketsService("https://invitailor.onrender.com");
            try {
                const currentUserId = Cookies.get("currentUser") || "";
                const currentUser = JSON.parse(currentUserId);
                const userId = currentUser.id;
                const eventsData = await eventsService.getTickets(userId);
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