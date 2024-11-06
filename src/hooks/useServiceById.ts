import { ServicesService } from "@/services/services.service";
import { Service } from "@/interfaces/service";

export const useServiceById = () => {
    const fetchService = async (serviceId:string) => {
        const serviceService = new ServicesService("https://invitailor.onrender.com");
        const service = await serviceService.getServiceById(serviceId);
        return service as Service;
    };

    return { fetchService };
};