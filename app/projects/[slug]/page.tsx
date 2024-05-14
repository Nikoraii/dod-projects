export default function Project({ params }: { params: { slug: string } }) {
    return (
        <>
            {params.slug}
        </>
    )
}