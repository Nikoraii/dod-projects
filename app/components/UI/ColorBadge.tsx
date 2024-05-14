import { Badge } from "@mantine/core";

export default function ColorBadge({ status }: {status: string}) {
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