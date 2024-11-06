import { EventsService } from "@/services/events.service";
import Cookies from 'js-cookie';

export const useDeleteEvent = () => {
    const deleteEvent = async (eventId: string): Promise<any> => {
        const token = Cookies.get("token");
        if (!token) {
            console.error("No authentication token found");
            return null;
        }
        const eventService = new EventsService("https://invitailor.onrender.com");
        try {
            const response = await eventService.deleteEvent(eventId, token);
            return response;
        } catch (error) {
            console.error("Error deleting event:", error);
            throw error;
        }
    };

    return { deleteEvent };
};
