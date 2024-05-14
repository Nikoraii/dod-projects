"use client";
import { useEffect, useState } from "react";
import { fetchRelease } from "../actions";

export default function Project({ params }: { params: { slug: string } }) {
    const [data, setData] = useState<Release | undefined>(undefined);

    const decodedURI: string = decodeURI(params.slug);

    useEffect(() => {
        fetchRelease(decodedURI)
            .then((res) => res)
            .then((data: Release | undefined) => {
                setData(data);
            })
    },[decodedURI])

    return (
        <>
            {JSON.stringify(data)}
        </>
    )
}