"use client"

import { useState, useEffect } from "react"
import { sendJSONData } from "../tools/Toolkit"
import { useRouter } from "next/navigation";
import { Corn, Corns } from "../tools/data.model";

export default function ChallengeForm() {
    const [search, setSearch] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [corns, setCorns] = useState<Corn[]>([]);


    useEffect(() => {


    }, [error]);

    const onSearch = async () => {
        if (search.length) {
            setCorns([]);
            let searchJson = { "search": search }


            let response: any = await sendJSONData('/api/challenge', searchJson, "POST");
            console.log(response.data)
            console.log(response.data.query)
            if (response.data.error) {
                setErrorText(response.data.error);
                setError(true);
            } else {
                // if successful
                setError(false);
                setCorns(response.data.types);
            }
        } else {
            setErrorText("You don't wanna see corn?");
        }
    }

    return (
        <div className="flex align-center justify-center mt-5">
            <div className="flex flex-col items-center gap-5">
                <label htmlFor="search">Corn Search</label>
                <input type="text" id="search" className="bg-white text-black p-1 rounded" onChange={(e) => setSearch(e.target.value)}></input>

                <button className="bg-orange-500 p-3 rounded-2xl text-black" onClick={onSearch}> Submit </button>

                <div className="text-red-600">{error ? `${errorText}` : ''}</div>

                <div className="flex flex-col max-w-2xl gap-4 rounded pb-2 pt-2">
                    {corns.map((corn, index) => (
                        <div key={index}>
                            <div id="type" className="bg-amber-500 p-2 text-black rounded">{corn.type}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}