import { ServicesService } from "@/services/services.service";
import { Service } from "@/interfaces/service";
import Cookies from 'js-cookie';

export const useEditService = () => {
    const editService = async (serviceId: string, name: string, description: string, price: number) => {
        const token = Cookies.get("token");
        if (!token) {
            console.error("No authentication token found");
            return null;
        }

        const serviceService = new ServicesService("https://invitailor.onrender.com");
        try {
            const service = await serviceService.editService(serviceId, name, description, price, token);
            return service as Service;
        } catch (error) {
            console.error("Failed to edit service:", error);
            return null;
        }
    };

    return { editService };
};
