import { ServicesService } from "@/services/services.service";
import Cookies from 'js-cookie';

export const useDeleteService = () => {
    const deleteService = async (serviceId: string): Promise<any> => {
        const token = Cookies.get("token");
        if (!token) {
            console.error("No authentication token found");
            return null;
        }
        const serviceService = new ServicesService("https://invitailor.onrender.com");
        try {
            const response = await serviceService.deleteService(serviceId, token);
            return response;
        } catch (error) {
            console.error("Error deleting service:", error);
            throw error;
        }
    };

    return { deleteService };
};
