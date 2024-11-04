import Cookies from "js-cookie";

export function useLogout() {
    const logout = () => {
        Cookies.remove("currentUser");
        Cookies.remove("token");
    };
    return { logout };
}