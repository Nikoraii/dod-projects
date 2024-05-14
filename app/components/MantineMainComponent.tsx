"use client";
import { AppShell, Burger, Group, UnstyledButton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

// Main Mantine Component from their Navbar example: https://mantine.dev/app-shell/?e=MobileNavbar
export function MantineMainComponent({
    children,
  }: {
    children: React.ReactNode;
  }) {
  // Burger menu toggle
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      mih='100vh'
    >
      {/* Header start */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="xs" />
          <Group justify="space-between" flex={1}>
            <UnstyledButton component={Link} href="/">
            <Text fw={500}>DoD Projects</Text>
            </UnstyledButton>
            <Group ml="xl" gap={14} visibleFrom="sm">
              <UnstyledButton component={Link} href='/'>HOME</UnstyledButton>
              <UnstyledButton component={Link} href='/projects'>PROJECTS</UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={8}>
        <UnstyledButton component={Link} href='/' onClick={toggle}>HOME</UnstyledButton>
        <UnstyledButton component={Link} href='/projects' onClick={toggle}>PROJECTS</UnstyledButton>
      </AppShell.Navbar>
      {/* Header end */}

      {/* Same as <main></main> */}
      <AppShell.Main>
        {children}
      </AppShell.Main>

    </AppShell>
  );
}