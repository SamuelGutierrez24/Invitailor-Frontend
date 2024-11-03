import { AuthService } from "@/services/auth.service";
import { Event } from "@/interfaces/event";
import Cookies from 'js-cookie';

export const useCreateEvent = () => {
    const createEvent = async (name: string, description: string, services: number[]) => {
        const token = Cookies.get("token"); // Asegúrate de que el nombre de la cookie sea "token"
        if (!token) {
            console.error("No authentication token found");
            return null;
        }

        const authService = new AuthService("https://invitailor.onrender.com");
        try {
            const event = await authService.createEvent(name, description, services, token);
            return event as Event;
        } catch (error) {
            console.error("Failed to create event:", error);
            return null;
        }
    };

    return { createEvent };
};