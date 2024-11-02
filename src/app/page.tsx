"use client";

import { useRouter } from "next/navigation";
import './globals.css';

export default function HomePage() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleRegister = (role: string) => {
    router.push(`/register?role=${role}`);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Invitailor</h1>
      <h2>Get started</h2>
      <div className="button-container">
        <button className="primary-button" onClick={handleLogin}>Login</button>
        <div className="dropdown">
          <p className="dropdown-toggle">Register as:</p>
          <div className="dropdown-menu">
            <button className="secondary-button" onClick={() => handleRegister("Admin")}>Admin</button>
            <button className="secondary-button" onClick={() => handleRegister("Host")}>Host</button>
            <button className="secondary-button" onClick={() => handleRegister("Attendant")}>Attendant</button>
            <button className="secondary-button" onClick={() => handleRegister("Provider")}>Provider</button>
          </div>
        </div>
      </div>
    </div>
  );
}