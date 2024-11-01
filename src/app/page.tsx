"use client";

import "./globals.css";
import { useRouter } from "next/navigation";
export default function StartPage() {

  const router = useRouter();
  const handleLogin = () => {
    router.push("/login")
  }
  const handleRegister = (role:string) => {
    router.push(`/register?role=${role}`);
  }

  return (
    <div>
      <h1>Welcome to Invitailor</h1>
      <h2>Get started</h2>
      <div className="button-container"> 
        <button onClick={handleLogin}>Login</button>
        Register as:
        <button onClick={() => handleRegister("Admin")}>Admin</button> 
        <button onClick={() => handleRegister("Host")}>Host</button> 
        <button onClick={() => handleRegister("Attendant")}>Attendant</button> 
        <button onClick={() => handleRegister("Provider")}>Provider</button> 
      </div>
    </div>
  );
}
