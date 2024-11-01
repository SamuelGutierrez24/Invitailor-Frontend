import axios, {AxiosInstance}  from 'axios';

export class AuthService {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios= axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 3000, 
            timeoutErrorMessage: 'Request Timeout'
        });
    }
  
    public async login(email: string, password: string) {
        const response = await this.axios.post('/auth/login', {
            email,
            password
        });

        return response.data;
    }

    public async register(fullname: string, email: string, password: string, role: string) {      
        const response = await this.axios.post(`/auth/register${role}`, {
            fullname,
            email,
            password
        });

        return response.data;
    }
}