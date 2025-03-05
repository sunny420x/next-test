"use client";
import { fetchActionApi } from "@/app/utills/action";
import { useState } from "react";

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
                alert("Wrong password!")
            }

            if(res.status == 200) {
                alert("Logged in!")
            }
        }
    }
    return(
        <div className="w-full max-w-xs mx-auto mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => Login(e)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="identifier" name="identifier" type="text" placeholder="Username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}