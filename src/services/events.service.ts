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

    public async createEvent(name: string, description: string, location: string, price: number, dateTime: string, serviceIds: number[], token: string, image: File) {
        try {
            console.log(serviceIds);
    
            // Create a FormData object to handle the image upload along with other event details
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('location', location);
            formData.append('price', price.toString());
            formData.append('dateTime', dateTime);
            serviceIds.forEach(serviceId => formData.append('serviceIds', serviceId.toString()));
            formData.append('file', image);
    
            const response = await this.axios.post('/events', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
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

    public async getEventById(eventId: string): Promise<any> {
        try {
            const response = await this.axios.get(`/events/${eventId}`);

            return response.data;
        } catch (error) {
            console.error("Error fetching event:", error);
            throw error;
        }
    }

    public async getEvents(): Promise<any> {
        try {
            const response = await this.axios.get('/events');

            return response.data;
        } catch (error) {
            console.error("Error fetching events:", error);
            throw error;
        }
    }
    
}