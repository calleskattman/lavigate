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
  // fler regioner läggs till här senare
];

// Helpers (används av dynamic routes)
export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getRegionById(id: RegionId): Region | undefined {
  return regions.find((r) => r.id === id);
}
