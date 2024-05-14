"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./actions";

export default function Projects() {
    const [data, setData] = useState<any>(undefined);

    useEffect(() => {
        fetchData()
            .then((res) => res)
            .then((data) => {
                setData(data);
            });
    }, []);
    return (
        <>
            <div>
                Projects page
            </div>
            {data && (
                <div>{JSON.stringify(data)}</div>
            )}
        </>
    )
}