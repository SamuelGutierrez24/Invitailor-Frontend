"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useRegister();


    const handleRegister = async () => {
        if (name && email && password && role) {
            try {
                const user = await register(name, email, password, role);
                console.log("Registered user:", user);
                alert("User registered! Please login");
                router.push("/login");
            } catch (error) {
                alert("Registration failed. Please try again.");
            }
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <div>
            <h1>Register as {role}</h1>
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}
