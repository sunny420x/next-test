"use client";
import { fetchActionApi, setAccessToken } from "@/app/utills/action";
import Swal from 'sweetalert2'

import { useState } from "react";

import { Button, Input } from "@/app/Components/material/input";

interface LoginRes {
    jwt: string;
    user: {
        id: number;
        document_id: number;    
    }
}

export default function LoginPage() {
    const [ identifier, setIdentifier ] = useState("");
    const [ password, setPassword ] = useState("");

    const Login = async(e: React.FormEvent) => {
        e.preventDefault();

        let body = {
            identifier: identifier,
            password: password
        }

        const res = await fetchActionApi("/api/auth/local", {method: "POST", body:JSON.stringify(body) })

        if(res) {
            console.log(res)

            if(res.status == 400) {
                Swal.fire({
                    title: "Unable to logged in",
                    icon: "error"
                });
            }

            if(res.status == 200) {
                const token = res.data as LoginRes;

                Swal.fire({
                    title: "Logged in !",
                    icon: "success"
                });

                setAccessToken(token.jwt);
            }
        }
    }
    return(
        <div className="w-full max-w-xs mx-auto mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => Login(e)}>
                <Input label={"Username"} id={"username"} type={"text"} value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
                <Input label={"Password"} id={"password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className="flex items-center justify-between">
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button> */}
                    <Button label="Sign In"/>
                </div>
            </form>
        </div>
    );
}