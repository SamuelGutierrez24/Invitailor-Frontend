import axios, { AxiosInstance } from 'axios';

export class ServicesService {
    private axios: AxiosInstance;

    constructor(url: string) {
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 3000,
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async createService(name: string, description: string, price: number, token: string) {
        try {
            const response = await this.axios.post('/providers', {
                name,
                description,
                price
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    }

    public async getServicesByProviderId(providerId: string): Promise<any> {
        try {
            const response = await this.axios.get(`/providers/service/${providerId}`);

            return response.data;
        } catch (error) {
            console.error("Error fetching events for host:", error);
            throw error;
        }
    }

    public async getProviders(): Promise<any> {
        try {
            const response = await this.axios.get('/providers');

            return response.data;
        } catch (error) {
            console.error("Error fetching providers:", error);
            throw error;
        }
    }

    public async getServiceById(serviceId: string): Promise<any> {
        try {
            const response = await this.axios.get(`/providers/${serviceId}`);

            return response.data;
        } catch (error) {
            console.error("Error fetching event:", error);
            throw error;
        }
    }

    public async deleteService(serviceId: string, token: string): Promise<any> {
        try {
            const response = await this.axios.delete(`/providers/${serviceId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
            return response.data;
        } catch (error) {
            console.error("Error deleting service:", error);
            throw error;
        }
    }

    public async editService(serviceId: string, name: string, description: string, price: number, token: string) {
        try {

            const response = await this.axios.patch(`/providers/${serviceId}`, {
                name,
                description,
                price
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            return response.data;
        } catch (error) {
            console.error("Error updating event:", error);
            throw error;
        }
    }
    
}
