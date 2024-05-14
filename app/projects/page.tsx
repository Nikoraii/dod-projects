"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./actions";
import { Flex, Paper, Stack, UnstyledButton, Text, Badge, Pagination, TextInput, Select, MultiSelect, Button } from "@mantine/core";
import Link from "next/link";
import classes from './page.module.css';

function chunk(releases: Release[] | [], size: number): any {
    if (!releases.length) {
      return [];
    }
    const head = releases.slice(0, size);
    const tail = releases.slice(size);
    return [head, ...chunk(tail, size)];
}

export default function Projects() {
    const [data, setData] = useState<DoD | undefined>(undefined);
    const [activePage, setActivePage] = useState(1);

    const [tags, setTags] = useState<string[]>([]);
    const [orgs, setOrgs] = useState<string[]>([]);

    useEffect(() => {
        fetchData()
            .then((res) => res)
            .then((data) => {
                // Set data with fetched data
                setData(data);

                // Get unique tags
                const uniqueTags = [
                    ...new Set(data.releases.reduce((releasesTags: string[], rel: Release) => [...releasesTags, ...rel.tags], []))
                ];
                console.log(uniqueTags);
                // Set sorted unique tags
                setTags(uniqueTags.sort());

                // Get unique organizations
                const uniqueOrgs = [
                    ...new Set(data.releases.map((item: Release) => item?.organization))
                ]
                // Some of the values are 'undefined' as not all of the projects have organization property
                // Filter them out
                const cleanOrgs = uniqueOrgs.filter(item => item);
                console.log(cleanOrgs);
                setOrgs(cleanOrgs);
            });
    }, []);

    const releasesPerPage = 10;
    const paginatedData = chunk(data && data.releases ? data.releases : [], releasesPerPage);

    const handlePageChange = (page: any) => {
        setActivePage(page);
    };

    return (
        <>
            <form id="form">
                <Flex
                    gap="md"
                    justify="flex-start"
                    align='center'
                    direction="row"
                    wrap="wrap"
                    mb={10}
                >
                    <TextInput
                        placeholder="Project name"
                        name="name"
                        defaultValue=""
                        w={{ base: "100%", sm: "fit-content" }}
                    />
                    <Select
                        placeholder="Project status"
                        data={['Production', 'Archival', 'Development', 'Release Candidate', 'Alpha v0.11 (Prototype)']}
                        name="status"
                        defaultValue=""
                        w={{ base: "100%", sm: "fit-content" }}
                    />
                    <Select
                        placeholder="Organization"
                        data={["Org1", "Org2", "Org3"]}
                        searchable
                        name="organization"
                        defaultValue=""
                        w={{ base: "100%", sm: "fit-content" }}
                    />
                    <MultiSelect
                        placeholder="Project tags"
                        searchable
                        clearable
                        name="tags"
                        w={{ base: "100%", sm: "fit-content" }}
                    />
                    <Flex
                        gap="md"
                        justify="center"
                        align="center"
                        direction="row"
                        wrap="wrap"
                    >
                        <Button color="gray">CLEAR</Button>
                        <Button color="blue" type="submit">SEARCH</Button>
                    </Flex>
                </Flex>
            </form>
            {data && (
                <>
                    <Stack
                        align="stretch"
                        justify="flex-start"
                        gap="md"
                    >
                        {paginatedData.length > 0 && paginatedData[activePage - 1].map((release: Release, index: number) => (
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
                        {!paginatedData.length && (
                            <div>NO DATA</div>
                        )}
                    </Stack>
                    <Pagination classNames={{ root: classes.root }} ta='center' withEdges total={paginatedData.length} value={activePage} onChange={handlePageChange} mt="sm" />
                </>
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