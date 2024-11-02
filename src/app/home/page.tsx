"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import AdminHomePage from "./homeAdmin";
import HostHomePage from "./homeHost";
import AttendantHomePage from "./homeAttendant";
import ProviderHomePage from "./homeProvider";
import './home.css';

export default function HomePage() {
    const { user } = useCurrentUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    if (user.roles.includes('admin')) {
        return <AdminHomePage />;
    } else if (user.roles.includes('host')) {
        return <HostHomePage />;
    } else if (user.roles.includes('attendant')) {
        return <AttendantHomePage />;
    } else if (user.roles.includes('provider')) {
        return <ProviderHomePage />;
    } else {
        return <div>Unauthorized</div>;
    }
}