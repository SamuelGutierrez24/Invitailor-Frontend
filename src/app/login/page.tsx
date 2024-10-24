"use client";

import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage(){
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const {login:loginFunction} = useLogin();

    const onSubmit = async () => {
        if(login && password){
            loginFunction(login, password).then((res) => {
                console.log(res);
                router.push("/profile");
            }
            ).catch((err) => {
                alert("Invalid login or password");
                setLogin("");
                setPassword("");
                console.log(err);
            });
        }else{
            alert("Please fill all fields");
        } 
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full" >
            <h1>Login Page</h1>
            <label className="mt-4">Login</label>
            <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}
            className="w-80 h-8 px-2 border border-solid border-black rounded text-black"/>

            <label className="mt-4">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
             className="w-80 h-8 px-2 border border-solid border-black rounded text-black"/>
             
             <button
             onClick={onSubmit}
             className="mt-4 p-2 bg-gray-900 text-white rounded hover:bg-gray-600 transition-all"
             >Login</button>
        </div>
    );
}