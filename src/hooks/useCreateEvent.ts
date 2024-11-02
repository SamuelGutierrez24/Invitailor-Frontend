import { AuthService } from "@/services/auth.service";
import { Event } from "@/interfaces/event";

export const useCreateEvent = () => {
    const createEvent = async (name: string, description: string) => {
        const authService = new AuthService("https://invitailor.onrender.com");
        const event = await authService.createEvent(name, description);
        return event as Event;
    };

    return { createEvent };
};