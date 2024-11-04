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

    
}