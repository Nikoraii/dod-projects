import styles from "./page.module.css";
import { Box, Code, Container, Flex, Text, Title, UnstyledButton, Button } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <Flex
        className={styles.hero}
        p={9}
        gap="xl"
        justify="start"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Container fluid>
          <Title order={1} tt='uppercase'>Department of Defense Projects</Title>
        </Container>
        <Container>
          <Text fw={500}>List of all public DoD projects</Text>
        </Container>
        <Container>
          <Text>Data:&nbsp;
            <Code c='blue.6'>
              <UnstyledButton component={Link} href='https://code.mil/code.json' target="_blank">https://code.mil/code.json</UnstyledButton>
            </Code>
          </Text>
        </Container>
        <Container>
          <Text c="dimmed" size="sm">This website is in no way related to Department of Defense or any US goverment branch and was made by a sole independant developer for educational and informational purposes only.</Text>
        </Container>
        <Container>
          <Button variant='light' size="md" radius="md" component={Link} href='/projects'>BROWSE</Button>
        </Container>
      </Flex>
    </Box>
  );
}
