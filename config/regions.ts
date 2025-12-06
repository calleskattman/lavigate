// config/regions.ts
import type { Region } from "@/lib/types";

/**
 * Temporary starter region list.
 * Vi fyller på alla regioner senare när vi har automation.
 */
export const regions: Region[] = [
  {
    id: "US-TX",
    slug: "texas",
    name: "Texas",
    countryCode: "US",
  },
  {
    id: "US-CA",
    slug: "california",
    name: "California",
    countryCode: "US",
  },
  {
    id: "CA-ON",
    slug: "ontario",
    name: "Ontario",
    countryCode: "CA",
  },
  {
    id: "AU-QLD",
    slug: "queensland",
    name: "Queensland",
    countryCode: "AU",
  },
];
