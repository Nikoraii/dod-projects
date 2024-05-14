'use server';

export async function fetchData() {
    const response = await fetch("https://code.mil/code.json");
    const data: DoD = await response.json();
    
    return data;
}

export async function filterData(formData: FormData) {
    const response = await fetch("https://code.mil/code.json");
    const data: DoD = await response.json();

    const releases: Release[] = data.releases;

    // Get filters from form
    const filters = {
        name: formData.get("name") as string,
        status: formData.get("status") as string,
        organization: formData.get("organization") as string,
        tags: formData.get("tags") as string,
    }

    // Filter by name, status, org and tags
    // Can be improved... 
    const nameResult: Release[] = releases.filter(
        (release: Release) => release.name.toLowerCase().includes(filters.name.toLowerCase())
    );
    const statusResult: Release[] = nameResult.filter(
        (nameRel: Release) => nameRel.status.includes(filters.status)
    );
    const organizationResult: Release[] = statusResult.filter(
        (statusRel: Release) => statusRel.organization ? statusRel?.organization?.includes(filters.organization) : statusRel
    );

    // Tags value is single string where values are seperated with a coma(,)
    // Split the tags and filter the data
    const tagsString: string = filters.tags;
    const tagsArray: string[] = tagsString.split(",");

    const tagsResult: Release[] = organizationResult.filter(
        (tagsRel: Release) => tagsString.length > 0 ? tagsArray.every(v => tagsRel.tags?.includes(v)) : tagsRel
    );

    // Set filtered releases to data
    data.releases = tagsResult;

    return data;
}