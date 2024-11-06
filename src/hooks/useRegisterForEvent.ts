import Cookies from "js-cookie";
import { TicketsService } from "@/services/tickets.service";
import { Ticket } from "@/interfaces/ticket";

export const useRegisterForEvent = () => {
    const register = async (eventId: string) => {
        const token = Cookies.get("token");
        if (!token) {
            console.error("No authentication token found");
            return null;
        }

        const currentUserId = Cookies.get("currentUser") || "";
        const currentUser = JSON.parse(currentUserId);
        const userId = currentUser.id;
      
        const eventService = new TicketsService("https://invitailor.onrender.com");
        try {
            const ticket = await eventService.registerTicket(eventId, userId, token);
            return ticket as Ticket;
        } catch (error) {
            console.error("Failed to create event:", error);
            return null;
        }
    };

    return { register };
};