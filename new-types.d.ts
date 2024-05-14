type DoD = {
    agency: string,
    version: string,
    measurementType: MeasurementType,
    releases: Release[]
}

type MeasurementType = {
    method: string
}

type Release = {
    name: string,
    description: string,
    version: string,
    organization: string,
    repositoryURL: string,
    status: string,
    languages: string[],
    tags: string[],
    contact: Contact,
    date: Date,

}

type Contact = {
    name: string,
    email: string,
    URL: string
}

type Date = {
    created: string,
    lastModified: string,
    metadataLastUpdated: string
}

type Permissions = {
    licenses: Licenses[],
    usageType: string
}

type Licenses = {
    name: string,
    URL: string
}