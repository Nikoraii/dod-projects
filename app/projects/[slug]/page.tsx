"use client";
import { useEffect, useState } from "react";
import { fetchRelease } from "../actions";
import { Flex, Title, Text, Group, Tooltip, UnstyledButton, Paper, Box, List } from "@mantine/core";
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
                    <Paper mt={10} shadow="md" radius="md" p="sm" withBorder>
                        <Flex justify={{ base: "flex-start", md: "space-evenly" }} mt={10} wrap="wrap" gap={20}>
                            <Box>
                            {data?.repositoryURL && (
                            <Box>
                                <Title order={2} c="dimmed" fw="normal">INFO</Title>
                                <Flex wrap="wrap">
                                    <Text fw={500} span>Repository:&nbsp;</Text>
                                    <UnstyledButton component={Link} href={data.repositoryURL} target="_blank" c="blue.5" fw={500}>
                                        {data.repositoryURL}
                                    </UnstyledButton>
                                </Flex>

                            </Box>
                        )}
                        {data?.date && (
                            <Box>
                                {data?.date?.created && (
                                    <Text>
                                        <Text span fw={500}>Created: </Text>
                                        <Text span>{data.date.created}</Text>
                                    </Text>
                                )}
                                {data?.date?.lastModified && (
                                    <Text>
                                        <Text span fw={500}>Updated: </Text>
                                        <Text span>{data.date.lastModified}</Text>
                                    </Text>
                                )}
                            </Box>
                        )}
                            </Box>
                            {(data?.contact?.name || data?.contact?.email !== "" || data?.contact?.URL) && (
                                <Box>
                                    <Title order={2} c="dimmed" fw="normal">CONTACT</Title>
                                    {data?.contact?.name && (
                                        <Text>
                                            <Text span fw={500}>Name: </Text>
                                            <Text span>{data.contact.name}</Text>
                                        </Text>
                                    )}
                                    {data?.contact?.email && (
                                        <Text>
                                            <Text span fw={500}>Email: </Text>
                                            <Text span><UnstyledButton fw={500} c="blue.5" component={Link} href={"mailto:" + data.contact.email}>{data.contact.email}</UnstyledButton></Text>
                                        </Text>
                                    )}
                                    {data?.contact?.URL && (
                                        <Text>
                                            <Text span fw={500}>Link: </Text>
                                            <Text span><UnstyledButton fw={500} c="blue.5" component={Link} href={data.contact.URL}>{data.contact.URL}</UnstyledButton></Text>
                                        </Text>
                                    )}
                                </Box>
                            )}
                            {data?.languages?.length > 0 && (
                                <Box>
                                    <Title order={2} c="dimmed" fw="normal">LANGUAGES</Title>
                                    <Text c="dimmed">List of languages used in this project.</Text>
                                    <List>
                                        {data.languages.map((lang: string) => {
                                            return (<List.Item key={lang}>{lang}</List.Item>);
                                        })}
                                    </List>
                                </Box>       
                            )
                            }
                        </Flex>
                    </Paper>
                </>
            )}
            {isWrongData && (<div>ERROR: WRONG URL</div>)}
        </>
    )
}