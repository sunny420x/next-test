"use client";
import { fetchActionApi } from "@/app/utills/action";
import { useState } from "react";

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
                alert("Register fail !")
            }

            if(res.status == 200) {
                alert("Register success!")
            }
        }
    }
    return(
        <div className="w-full max-w-xs mx-auto mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => Register(e)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}