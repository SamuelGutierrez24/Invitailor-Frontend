"use client";

import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import './login.css';

export default function LoginPage(){
    useEffect(() => {
        Cookies.remove("currentUser");
        Cookies.remove("token");
    }, []);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const {login:loginFunction} = useLogin();

    const onSubmit = async () => {
        if(login && password){
            loginFunction(login, password).then((res) => {
                console.log(res);
                router.push("/home");
            }
            ).catch((err) => {
                alert("Invalid email or password");
                setLogin("");
                setPassword("");
                console.log(err);
            });
        }else{
            alert("Please fill all fields");
        } 
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login Page</h1>
                <label className="login-label" htmlFor="loginInput">Login</label>
                <input 
                    id="loginInput"
                    type="text" 
                    placeholder="Login" 
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)}
                    className="login-input"
                />
                <label className="login-label" htmlFor="passwordInput">Password</label>
                <input 
                    id="passwordInput"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button id="loginButton" type="submit" onClick={onSubmit}>Login</button>
            </div>
        </div>
    );
}