"use client"

import { useState, useEffect } from "react"
import { sendJSONData } from "../tools/Toolkit"
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [vulnerable, setVulnerable] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {


    }, [error]);

    const onLogin = async () => {
        let loginJson = { "username": username, "password": password }


        let response: any = await sendJSONData(`/api/login/${vulnerable ? 'vulnerable' : 'hardened'}`, loginJson, "POST");
        console.log(response.data.query)
        if (response.data.error) {
            setErrorText(response.data.error);
            setError(true);
        } else {
            router.push("/corn");
        }

    }

    return (
        <div className="flex align-center justify-center mt-5">
            <div className="flex flex-col items-center gap-5">
                <h1>Login</h1>
                <p className={`${vulnerable ? 'text-red-600' : 'text-green-500'}`}>Current Method: {vulnerable ? 'vulnerable' : 'hardened'}</p>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" className="bg-white text-black p-1 rounded" onChange={(e) => setUsername(e.target.value)}></input>

                <label htmlFor="password">Password</label>
                <input type="password" id="username" className="bg-white text-black p-1 rounded" onChange={(e) => setPassword(e.target.value)}></input>

                <button className="bg-orange-500 p-3 rounded-2xl text-black" onClick={onLogin}> Submit </button>
                <button className="bg-orange-500 p-3 rounded-2xl text-black" onClick={(e) => setVulnerable(!vulnerable)}> Change Route </button>


                <div className="text-red-600">{error ? `${errorText}` : ''}</div>
            </div>
        </div>


    )
}