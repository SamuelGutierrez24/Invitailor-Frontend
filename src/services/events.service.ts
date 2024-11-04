import axios, { AxiosInstance } from 'axios';

export class EventsService {
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

    public async createEvent(name: string, description: string, services: number[], token: string) {
        try {
            const response = await this.axios.post('/events', {
                name,
                description,
                services
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

    public async getEventsByHostId(hostId: string): Promise<any> {
        try {
            const response = await this.axios.get(`/events/host/${hostId}`);

            return response.data;
        } catch (error) {
            console.error("Error fetching events for host:", error);
            throw error;
        }
    }

    
}