import React from "react";
import './sidebar.css';
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

const Sidebar: React.FC = () => {
    const router = useRouter();

    const { logout } = useLogout()

    const handleLogout = () => {
        logout();
        router.push('/')
    }

    const handleHome = () => {
        router.push('/home');
    }

    const handleCreateService = () => {
        router.push('/createService');
    }
    return (
        <aside className="sidebar">
            <div className="logo">InviTailor</div>
            <div className="menu">
            <button className="menu-item" onClick={handleCreateService}>
                        <span className="icon">➕</span> Create Service
                    </button>
                    <button className="menu-item" onClick={handleHome}>
                        <span className="icon">🛠️</span> My Services
                    </button>
                <button id='logout' className="menu-item logout-button" onClick={handleLogout}>
                    <span className="icon">🚪</span> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;