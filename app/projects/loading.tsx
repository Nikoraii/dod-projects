import { Loader, Flex } from '@mantine/core';

export default function Loading() {
  return (
    <Flex justify="center" align="center">
        <Loader color="blue" size="lg" />
    </Flex>
  )
}