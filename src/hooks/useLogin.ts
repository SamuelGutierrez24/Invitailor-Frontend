import { User } from "@/interfaces/user";
import { AuthService } from "@/services/auth.service"
import Cookies from "js-cookie";

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const authService = new AuthService("https://invitailor.onrender.com");
        const user = await authService.login(email, password);
        if (user)
            Cookies.set("currentUser", JSON.stringify(user));

        return user as User;        
    }

    return {login};
};

// import { AuthService } from "@/services/auth.service";
// import Cookies from "js-cookie";

// export const useLogin = () => {
//     const login = async (email: string, password: string) => {
//         const authService = new AuthService("https://invitailor.onrender.com");
//         const { token, user } = await authService.login(email, password);
//         if (token) {
//             Cookies.set("token", token); // Asegúrate de que el nombre de la cookie sea "token"
//             Cookies.set("currentUser", JSON.stringify(user));
//         }
//         return user;
//     };

//     return { login };
// };
