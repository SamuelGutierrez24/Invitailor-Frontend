import React from "react";
import './sidebar.css';
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

const Sidebar: React.FC = () => {
    const router = useRouter();

    const handleAddEvent = () => {
        router.push('/createEvent');
    };

    const { logout } = useLogout()

    const handleLogout = () => {
        logout();
        router.push('/')
    }

    const handleViewProviders = () => {
        router.push('/viewProviders');
    }

    const handleHome = () => {
        router.push('/home');
    }
    return (
        <aside className="sidebar">
            <div className="logo">InviTailor</div>
            <div className="menu">
                <button className="menu-item" onClick={handleViewProviders}>
                    <span className="icon">🔧</span> Providers
                </button>
                <button className="menu-item" onClick={handleAddEvent}>
                    <span className="icon">➕</span> Create Event
                </button>
                <button className="menu-item" onClick={handleHome}>
                    <span className="icon">📅</span> Home / My Events
                </button>
                <button className="menu-item logout-button" onClick={handleLogout}>
                    <span className="icon">🚪</span> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;