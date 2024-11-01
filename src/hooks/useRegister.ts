import { AuthService } from "@/services/auth.service";
import { User } from "@/interfaces/user";

export const useRegister = () => {
    const register = async (fullname: string, email: string, password: string, role: string) => {
        const authService = new AuthService("https://invitailor.onrender.com");
        const user = await authService.register(fullname, email, password, role);
        return user as User;
    };

    return { register };
};