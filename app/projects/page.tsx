"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchData, filterData } from "./actions";
import { Flex, Paper, Stack, UnstyledButton, Text, Badge, Pagination, TextInput, Select, MultiSelect, Button, Box, SegmentedControl } from "@mantine/core";
import Link from "next/link";
import classes from './page.module.css';
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import ColorBadge from "../components/UI/ColorBadge";

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

    // Default values for sorting
    const [segmentValue, setSegmentValue] = useState<string>("Organization");
    const [order, setOrder] = useState<string>("DESC");

    const initialFormState = {
        name: '',
        status: null,
        organization: null,
        tags: []
    }
    const [formState, setFormState] = useState(initialFormState);


    // Initial data fetch
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
                // Set sorted unique tags
                setTags(uniqueTags.sort());

                // Get unique organizations
                const uniqueOrgs = [
                    ...new Set(data.releases.map((item: Release) => item?.organization))
                ]
                // Some of the values are 'undefined' as not all of the projects have organization property
                // Filter them out
                const cleanOrgs = uniqueOrgs.filter(item => item);
                setOrgs(cleanOrgs);
            });
    }, []);

    const releasesPerPage = 10;
    const paginatedData = chunk(data && data.releases ? data.releases : [], releasesPerPage);

    const handlePageChange = (page: any) => {
        setActivePage(page);
    };

    // On input value change
    const handleChange = (inputName: string, inputValue: any) => {
        const value = inputValue;
        const name = inputName;

        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClear = () => {
        setFormState(initialFormState);
        resetData();
    };

    // Return data back to default
    async function resetData() {
        const defaultData = await fetchData();
        setActivePage(1);
        setData(defaultData);
        setSegmentValue("Organization");
        setOrder("DESC");
    }

    // Sort and set data
    function sortData(value: string, ord: string): void {
        const valueLowerCase = value.toLowerCase();
        let sortedReleases: Release[] | undefined;
        if (ord === "ASC") {
            sortedReleases = data?.releases?.toSorted((a: any, b: any) => b[valueLowerCase]?.localeCompare(a[valueLowerCase]));
        } else {
            sortedReleases = data?.releases?.toSorted((a: any, b: any) => a[valueLowerCase]?.localeCompare(b[valueLowerCase]));
        }
        const sortedData: DoD = {
            ...data,
            releases: sortedReleases
        } as DoD;

        setData(sortedData);
    };

    // Update order: Ascending or Descending
    const updateOrder = (() => {
        setOrder(prevOrder => {
            const newOrder = prevOrder === "ASC" ? "DESC" : "ASC";
            sortData(segmentValue, newOrder);
            return newOrder;
        });
    });

    // On form submit
    const submitFilters = (async (event: FormEvent<HTMLFormElement>) => {
        // Prevent page refresh
        event.preventDefault();

        // Get form values
        const formData = new FormData(event.currentTarget);

        // Get filtered data
        const filteredData: DoD = await filterData(formData);
        setActivePage(1);
        setData(filteredData);
    });

    return (
        <>
            <form id="form" onSubmit={submitFilters}>
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
                        value={formState.name}
                        onChange={(event) => handleChange(event.currentTarget.name, event.currentTarget.value)}
                        w={{ base: "100%", sm: "fit-content" }}
                    />
                    <Select
                        placeholder="Project status"
                        data={['Production', 'Archival', 'Development', 'Release Candidate', 'Alpha v0.11 (Prototype)']}
                        name="status"
                        defaultValue=""
                        value={formState.status}
                        onChange={(_value, option) => {handleChange("status", option.value)}}
                        w={{ base: "100%", sm: "fit-content" }}
                    />
                    <Select
                        placeholder="Organization"
                        data={orgs && orgs}
                        searchable
                        name="organization"
                        defaultValue=""
                        value={formState.organization}
                        onChange={(_value, option) => {handleChange("organization", option.value)}}
                        w={{ base: "100%", sm: "fit-content" }}
                    />
                    <MultiSelect
                        placeholder="Project tags"
                        data={tags && tags}
                        searchable
                        clearable
                        name="tags"
                        value={formState.tags}
                        onChange={(value) => handleChange("tags", value)}
                        w={{ base: "100%", sm: "fit-content" }}
                    />
                    <Flex
                        gap="md"
                        justify="center"
                        align="center"
                        direction="row"
                        wrap="wrap"
                    >
                        <Button color="gray" onClick={handleClear}>CLEAR</Button>
                        <Button color="blue" type="submit">SEARCH</Button>
                    </Flex>
                    <Box ml={{ sm: "auto" }}>
                            <SegmentedControl mr={10} data={['Organization', 'Name', 'Status']} defaultValue="Organization" value={segmentValue} onChange={((value: string) => {
                                setSegmentValue(value);
                                sortData(value, order);
                            })} />
                            <Button variant="light" color="gray" onClick={updateOrder}>
                                {order === "ASC" && (
                                    <FaSortAlphaUp />
                                )}
                                {order === "DESC" && (
                                    <FaSortAlphaDown />
                                )}
                            </Button>
                        </Box>
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