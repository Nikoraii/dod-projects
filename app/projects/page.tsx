"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./actions";
import { Flex, Paper, Stack, UnstyledButton, Text, Badge } from "@mantine/core";
import Link from "next/link";

export default function Projects() {
    const [data, setData] = useState<DoD | undefined>(undefined);

    useEffect(() => {
        fetchData()
            .then((res) => res)
            .then((data) => {
                setData(data);
            });
    }, []);

    return (
        <>
            {data && (
                <Stack
                    align="stretch"
                    justify="flex-start"
                    gap="md"
                >
                    {data.releases.map((release: Release, index: number) => (
                        <Paper shadow="sm" radius="lg" withBorder p="sm" key={index}>
                            <Flex
                                gap="md"
                                justify="space-between"
                                align="center"
                                direction="row"
                                wrap="wrap"
                            >
                                <div>
                                    <UnstyledButton c="blue.5" fw={500} component={Link} href={'projects/' + release.name}>
                                        {release.name}
                                    </UnstyledButton>
                                    &nbsp;{release.organization && (<Text span c="dimmed">&nbsp;{release.organization}</Text>)}
                                </div>
                                <div>
                                    <Text span ff="monospace" c="dimmed">{release.version && (release.version + " - ")}</Text><ColorBadge status={release.status} />
                                </div>
                            </Flex>
                        </Paper>
                    ))}
                </Stack>
            )}
        </>
    )
}

function ColorBadge({ status }: {status: string}) {
    switch (status) {
        case 'Production':
            return <Badge color="green">{status}</Badge>;
        case 'Archival':
            return <Badge color="gray">{status}</Badge>;
        case 'Development':
            return <Badge color="blue">{status}</Badge>;
        case 'Release Candidate':
            return <Badge color="yellow">{status}</Badge>;
        case 'Alpha v0.11 (Prototype)':
            return <Badge color="orange">{status}</Badge>;
        default:
            return <Badge color="cyan">{status}</Badge>;
    }
}