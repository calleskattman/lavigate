// config/regions.ts

export type CountryCode = "US" | "CA" | "UK" | "AU";

export type RegionId = string; // ISO 3166-2, t.ex. "US-TX"

export type Region = {
  id: RegionId;          // "US-TX"
  countryCode: CountryCode;
  slug: string;          // "texas"
  name: string;          // "Texas"
  displayName: string;   // "Texas" eller "Texas (United States)"
};

export const regions: Region[] = [
  {
    id: "US-TX",
    countryCode: "US",
    slug: "texas",
    name: "Texas",
    displayName: "Texas",
  },
  {
    id: "US-CA",
    countryCode: "US",
    slug: "california",
    name: "California",
    displayName: "California",
  },
  {
    id: "US-VA",
    countryCode: "US",
    slug: "virginia",
    name: "Virginia",
    displayName: "Virginia",
  },
  {
    id: "US-MI",
    countryCode: "US",
    slug: "michigan",
    name: "Michigan",
    displayName: "Michigan",
  },  
  { id: "US-MN", countryCode: "US", slug: "minnesota", name: "Minnesota", displayName: "Minnesota" },
  { id: "US-UT", countryCode: "US", slug: "utah", name: "Utah", displayName: "Utah" },
  { id: "US-AL", countryCode: "US", slug: "alabama", name: "Alabama", displayName: "Alabama" },
  { id: "US-OK", countryCode: "US", slug: "oklahoma", name: "Oklahoma", displayName: "Oklahoma" },
  { id: "US-HI", countryCode: "US", slug: "hawaii", name: "Hawaii", displayName: "Hawaii" },
  { id: "US-KS", countryCode: "US", slug: "kansas", name: "Kansas", displayName: "Kansas" },
  { id: "US-ID", countryCode: "US", slug: "idaho", name: "Idaho", displayName: "Idaho" },
  { id: "US-KY", countryCode: "US", slug: "kentucky", name: "Kentucky", displayName: "Kentucky" },
  { id: "US-IA", countryCode: "US", slug: "iowa", name: "Iowa", displayName: "Iowa" },
  { id: "US-ME", countryCode: "US", slug: "maine", name: "Maine", displayName: "Maine" },
  { id: "US-DE", countryCode: "US", slug: "delaware", name: "Delaware", displayName: "Delaware" },
  { id: "US-MS", countryCode: "US", slug: "mississippi", name: "Mississippi", displayName: "Mississippi" },
  { id: "US-OH", countryCode: "US", slug: "ohio", name: "Ohio", displayName: "Ohio" },
  { id: "US-AR", countryCode: "US", slug: "arkansas", name: "Arkansas", displayName: "Arkansas" },
  { id: "US-MT", countryCode: "US", slug: "montana", name: "Montana", displayName: "Montana" },
  { id: "US-NE", countryCode: "US", slug: "nebraska", name: "Nebraska", displayName: "Nebraska" },
  { id: "US-AZ", countryCode: "US", slug: "arizona", name: "Arizona", displayName: "Arizona" },
  { id: "US-CO", countryCode: "US", slug: "colorado", name: "Colorado", displayName: "Colorado" },
  { id: "US-CT", countryCode: "US", slug: "connecticut", name: "Connecticut", displayName: "Connecticut" },
  { id: "US-FL", countryCode: "US", slug: "florida", name: "Florida", displayName: "Florida" },
  // fler regioner läggs till här senare
];

// Helpers (används av dynamic routes)
export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getRegionById(id: RegionId): Region | undefined {
  return regions.find((r) => r.id === id);
}
