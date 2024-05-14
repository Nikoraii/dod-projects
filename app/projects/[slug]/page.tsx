"use client";
import { useEffect, useState } from "react";
import { fetchRelease } from "../actions";

export default function Project({ params }: { params: { slug: string } }) {
    const [data, setData] = useState<Release | undefined>(undefined);
    const [isWrongData, setIsWrondData] = useState(false);


    const decodedURI: string = decodeURI(params.slug);

    useEffect(() => {
        fetchRelease(decodedURI)
            .then((res) => res)
            .then((data: Release | undefined) => {
                if (data === undefined) {
                    setIsWrondData(true);
                } else {
                    setData(data);
                }
            })
    },[decodedURI])

    return (
        <>
            {JSON.stringify(data)}
            {isWrongData && (<div>ERROR: WRONG URL</div>)}
        </>
    )
}