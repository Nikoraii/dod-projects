"use client";
import { useEffect, useState } from "react";
import { fetchRelease } from "../actions";
import { Flex, Title, Text, Group, Tooltip, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { GoLaw } from "react-icons/go";
import ColorBadge from "@/app/components/UI/ColorBadge";

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
            {data && (
                <>
                    <Flex justify="space-between" direction={{ base: "column", sm: "row" }}>
                        <Title order={1}>{data?.name}</Title>
                        <Group>{data?.version && (<Text span ff="monospace">{data.version} - </Text>)}<ColorBadge status={data.status} /></Group>
                    </Flex>
                    <Group>
                        <Text c="dimmed">{data?.organization}</Text>
                        {data?.permissions?.licenses && (
                            data.permissions.licenses.map((license: Licenses) => {
                                return (
                                    <Tooltip label={license.name} key={license.name}>
                                        <UnstyledButton component={Link} href={license.URL}>
                                            <GoLaw />
                                        </UnstyledButton>
                                    </Tooltip>
                                )
                            })
                        )}
                    </Group>
                    <Text fw={500}>{data?.description}</Text>
                </>
            )}
            {isWrongData && (<div>ERROR: WRONG URL</div>)}
        </>
    )
}