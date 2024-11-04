import axios, { AxiosInstance } from 'axios';

export class AuthService {
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

    public async register(fullname: string, email: string, password: string, role: string) {
        const response = await this.axios.post(`/auth/register${role}`, {
            fullname,
            email,
            password
        });

        return response.data;
    }

    public async login(email: string, password: string) {
        const response = await this.axios.post('/auth/login', {
            email,
            password
        });

        const { token, ...user } = response.data;
        
        return { token, ...user };
    }
}