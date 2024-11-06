import { ServicesService } from "@/services/services.service";
import { Service } from "@/interfaces/service";
import Cookies from 'js-cookie';

export const useCreateService = () => {
    const createService = async (name: string, description: string, price: number) => {
        const token = Cookies.get("token");
        if (!token) {
            console.error("No authentication token found");
            return null;
        }

        const servicesService = new ServicesService("https://invitailor.onrender.com");
        try {
            const event = await servicesService.createService(name, description, price, token);
            return event as Service;
        } catch (error) {
            console.error("Failed to create service:", error);
            return null;
        }
    };

    return { createService };
};