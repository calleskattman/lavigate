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
  { id: "US-GA", countryCode: "US", slug: "georgia", name: "Georgia", displayName: "Georgia" },
  { id: "US-IN", countryCode: "US", slug: "indiana", name: "Indiana", displayName: "Indiana" },
  { id: "US-LA", countryCode: "US", slug: "louisiana", name: "Louisiana", displayName: "Louisiana" },
  { id: "US-MD", countryCode: "US", slug: "maryland", name: "Maryland", displayName: "Maryland" },
  { id: "US-MA", countryCode: "US", slug: "massachusetts", name: "Massachusetts", displayName: "Massachusetts" },
  { id: "US-MO", countryCode: "US", slug: "missouri", name: "Missouri", displayName: "Missouri" },
  { id: "US-NV", countryCode: "US", slug: "nevada", name: "Nevada", displayName: "Nevada" },
  { id: "US-NJ", countryCode: "US", slug: "new-jersey", name: "New Jersey", displayName: "New Jersey" },
  { id: "US-NY", countryCode: "US", slug: "new-york", name: "New York", displayName: "New York" },
  { id: "US-NC", countryCode: "US", slug: "north-carolina", name: "North Carolina", displayName: "North Carolina" },
  { id: "US-OR", countryCode: "US", slug: "oregon", name: "Oregon", displayName: "Oregon" },
  { id: "US-PA", countryCode: "US", slug: "pennsylvania", name: "Pennsylvania", displayName: "Pennsylvania" },
  { id: "US-RI", countryCode: "US", slug: "rhode-island", name: "Rhode Island", displayName: "Rhode Island" },
  { id: "US-SC", countryCode: "US", slug: "south-carolina", name: "South Carolina", displayName: "South Carolina" },
  { id: "US-SD", countryCode: "US", slug: "south-dakota", name: "South Dakota", displayName: "South Dakota" },
  { id: "US-TN", countryCode: "US", slug: "tennessee", name: "Tennessee", displayName: "Tennessee" },
  { id: "US-WA", countryCode: "US", slug: "washington", name: "Washington", displayName: "Washington" },
  { id: "US-WI", countryCode: "US", slug: "wisconsin", name: "Wisconsin", displayName: "Wisconsin" },
  { id: "US-WY", countryCode: "US", slug: "wyoming", name: "Wyoming", displayName: "Wyoming" },
  { id: "US-PR", countryCode: "US", slug: "puerto-rico", name: "Puerto Rico", displayName: "Puerto Rico" },
  { id: "US-CA-ALAMEDA-COUNTY", countryCode: "US", slug: "alameda-county-california", name: "Alameda County", displayName: "Alameda County, California" },
  { id: "US-FL-BROWARD-COUNTY", countryCode: "US", slug: "broward-county-florida", name: "Broward County", displayName: "Broward County, Florida" },
  { id: "US-NV-CLARK-COUNTY", countryCode: "US", slug: "clark-county-nevada", name: "Clark County", displayName: "Clark County, Nevada" },
  { id: "US-NY-ERIE-COUNTY", countryCode: "US", slug: "erie-county-new-york", name: "Erie County", displayName: "Erie County, New York" },
  { id: "US-OH-FRANKLIN-COUNTY", countryCode: "US", slug: "franklin-county-ohio", name: "Franklin County", displayName: "Franklin County, Ohio" },
  { id: "US-PA-FRANKLIN-COUNTY", countryCode: "US", slug: "franklin-county-pennsylvania", name: "Franklin County", displayName: "Franklin County, Pennsylvania" },
  { id: "US-NY-FRANKLIN-COUNTY", countryCode: "US", slug: "franklin-county-new-york", name: "Franklin County", displayName: "Franklin County, New York" },
  { id: "US-TX-FRANKLIN-COUNTY", countryCode: "US", slug: "franklin-county-texas", name: "Franklin County", displayName: "Franklin County, Texas" },
  { id: "US-FL-POLK-COUNTY", countryCode: "US", slug: "polk-county-florida", name: "Polk County", displayName: "Polk County, Florida" },
  { id: "US-NY-SUFFOLK-COUNTY", countryCode: "US", slug: "suffolk-county-new-york", name: "Suffolk County", displayName: "Suffolk County, New York" },
  { id: "US-TX-AUSTIN-CITY", countryCode: "US", slug: "austin-city-texas", name: "Austin", displayName: "Austin" },
  { id: "US-MA-BOSTON-CITY", countryCode: "US", slug: "boston-city-massachusetts", name: "Boston", displayName: "Boston" },
  { id: "US-TX-DALLAS-CITY", countryCode: "US", slug: "dallas-texas", name: "Dallas", displayName: "Dallas" },
  { id: "US-TX-HOUSTON-CITY", countryCode: "US", slug: "houston-texas", name: "Houston", displayName: "Houston" },
  // fler regioner läggs till här senare
];

// Helpers (används av dynamic routes)
export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getRegionById(id: RegionId): Region | undefined {
  return regions.find((r) => r.id === id);
}
