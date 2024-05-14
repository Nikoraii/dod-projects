export default function Project({ params }: { params: { slug: string } }) {
    const decodedURI: string = decodeURI(params.slug);

    return (
        <>
            {decodedURI}
        </>
    )
}