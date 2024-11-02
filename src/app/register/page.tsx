"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useRegister";
import './register.css';

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("defaultRole");
    const router = useRouter();
    const { register } = useRegister();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const roleParam = searchParams.get('role');
        if (roleParam) {
            setRole(roleParam);
        }
    }, []);

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
        <div className="register-container">
            <h1>Register as {role}</h1>
            <div className="form-group">
                <label>Name</label>
                <input 
                    title="Name"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="register-input"
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input 
                    title="Email"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="register-input"
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                    title="Password"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="register-input"
                />
            </div>
            <div className="form-group">
                <label>Role</label>
                <input 
                    title="Role"
                    type="text" 
                    value={role} 
                    readOnly
                    className="register-input"
                />
            </div>
            <button onClick={handleRegister} className="register-button">Register</button>
        </div>
    );
}