export type Authority = {
    name: string;
    url: string;
    lastVerified: string;
  };
  
  export const PAYCHECK_AUTHORITY: Authority = {
    name: "Internal Revenue Service",
    url: "https://www.irs.gov",
    lastVerified: "2026-02-02",
  };
  