import axios, { AxiosInstance } from 'axios';

export class TicketsService {
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

    public async registerTicket(eventId: string, userId: string, token: string) {
        try {
            const response = await this.axios.post('/tickets', {
                userId,
                eventId
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        console.error("Error registering to event:", error);
        throw error;
        }
    }

    public async getTickets(userId: string): Promise<any> {
        try {
            const response = await this.axios.get(`/tickets/attendant/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching events:", error);
            throw error;
            }
        }

}
