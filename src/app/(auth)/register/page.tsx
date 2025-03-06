"use client";
import { Button, Input } from "@/app/Components/material/input";
import { fetchActionApi } from "@/app/utills/action";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");

    const Register = async(e: React.FormEvent) => {
        e.preventDefault();
        let body = {
            username: username,
            email: email,
            password: password
        }
        const res = await fetchActionApi("/api/auth/local/register", {method: "POST", body:JSON.stringify(body) })

        if(res) {
            console.log(res)

            if(res.status == 400) {
                Swal.fire({
                    title: "Register Fail !",
                    icon: "error"
                });
            }

            if(res.status == 200) {
                Swal.fire({
                    title: "Register success",
                    icon: "success"
                });
            }
        }
    }
    return(
        <div className="w-full max-w-xs mx-auto mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => Register(e)}>
                <Input label={"Username"} id={"username"} type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} required />
                <Input label={"Email"} id={"email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input label={"Password"} id={"password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className="flex items-center justify-between">
                    <Button label="Sign Up"/>
                </div>
            </form>
        </div>
    );
}