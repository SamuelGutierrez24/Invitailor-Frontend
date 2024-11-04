import axios, { AxiosInstance } from 'axios';

export class ProvidersService {
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