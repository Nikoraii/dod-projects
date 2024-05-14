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
                                    <Text span ff="monospace" c="dimmed">{release.version && (release.version + " - ")}</Text><Badge>{release.status}</Badge>
                                </div>
                            </Flex>
                        </Paper>
                    ))}
                </Stack>
            )}
        </>
    )
}