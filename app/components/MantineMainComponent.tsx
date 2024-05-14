"use client";
import { AppShell, Burger, Group, UnstyledButton, Text, ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import classes from "./MantineMainComponent.module.css";
import { MdDarkMode, MdLightMode } from 'react-icons/md';

// Main Mantine Component from their Navbar example: https://mantine.dev/app-shell/?e=MobileNavbar
export function MantineMainComponent({
    children,
  }: {
    children: React.ReactNode;
  }) {
  // Burger menu toggle
  const [opened, { toggle }] = useDisclosure();

  // Theme color mode
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

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
            {/* Toggle theme mobile */}
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                radius="md"
                size="lg"
                aria-label="Toggle color scheme"
                hiddenFrom='sm'
              >
                {
                  computedColorScheme === 'dark' ? <MdLightMode /> : <MdDarkMode />
                }
            </ActionIcon>
            {/* Non-mobile menu */}
            <Group ml="xl" gap={14} visibleFrom="sm">
              <UnstyledButton component={Link} className={classes.control} href='/'>HOME</UnstyledButton>
              <UnstyledButton component={Link} className={classes.control} href='/projects'>PROJECTS</UnstyledButton>
              {/* Toggle theme for bigger screens */}
              <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                radius="md"
                size="lg"
                aria-label="Toggle color scheme"
              >
                {
                  computedColorScheme === 'dark' ? <MdLightMode /> : <MdDarkMode />
                }
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={8}>
        <UnstyledButton component={Link} className={classes.controlMobile} href='/' onClick={toggle}>HOME</UnstyledButton>
        <UnstyledButton component={Link} className={classes.controlMobile} href='/projects' onClick={toggle}>PROJECTS</UnstyledButton>
      </AppShell.Navbar>
      {/* Header end */}

      {/* Same as <main></main> */}
      <AppShell.Main>
        {children}
      </AppShell.Main>

    </AppShell>
  );
}