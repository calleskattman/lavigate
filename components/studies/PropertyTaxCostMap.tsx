"use client";

import { useMemo, useState } from "react";
import statesTopo from "us-atlas/states-10m.json";
import {
    ComposableMap,
    Geographies,
    Geography,
  } from "@vnedyalk0v/react19-simple-maps";

  const GEO_URL = statesTopo;

type StateName =
  | "Alabama"
  | "Alaska"
  | "Arizona"
  | "Arkansas"
  | "California"
  | "Colorado"
  | "Connecticut"
  | "Delaware"
  | "Florida"
  | "Georgia"
  | "Hawaii"
  | "Idaho"
  | "Illinois"
  | "Indiana"
  | "Iowa"
  | "Kansas"
  | "Kentucky"
  | "Louisiana"
  | "Maine"
  | "Maryland"
  | "Massachusetts"
  | "Michigan"
  | "Minnesota"
  | "Mississippi"
  | "Missouri"
  | "Montana"
  | "Nebraska"
  | "Nevada"
  | "New Hampshire"
  | "New Jersey"
  | "New Mexico"
  | "New York"
  | "North Carolina"
  | "North Dakota"
  | "Ohio"
  | "Oklahoma"
  | "Oregon"
  | "Pennsylvania"
  | "Rhode Island"
  | "South Carolina"
  | "South Dakota"
  | "Tennessee"
  | "Texas"
  | "Utah"
  | "Vermont"
  | "Virginia"
  | "Washington"
  | "West Virginia"
  | "Wisconsin"
  | "Wyoming";

type StateTaxDatum = {
  name: StateName;
  abbr: string;
  ratePct: number;
  medianHomeValue: number;
  href?: string;
};

const AVAILABLE_CALCULATOR_HREFS: Partial<Record<StateName, string>> = {
  Virginia: "/tools/property-tax/virginia",
  Michigan: "/tools/property-tax/michigan",
  Kansas: "/tools/property-tax/kansas",
  Kentucky: "/tools/property-tax/kentucky",
  Arkansas: "/tools/property-tax/arkansas",
  "South Dakota": "/tools/property-tax/south-dakota",
  Wisconsin: "/tools/property-tax/wisconsin",
  Wyoming: "/tools/property-tax/wyoming",
  Vermont: "/tools/property-tax/vermont",
  "West Virginia": "/tools/property-tax/west-virginia",
};

const FIPS_TO_STATE: Record<string, StateName> = {
    "01": "Alabama",
    "02": "Alaska",
    "04": "Arizona",
    "05": "Arkansas",
    "06": "California",
    "08": "Colorado",
    "09": "Connecticut",
    "10": "Delaware",
    "12": "Florida",
    "13": "Georgia",
    "15": "Hawaii",
    "16": "Idaho",
    "17": "Illinois",
    "18": "Indiana",
    "19": "Iowa",
    "20": "Kansas",
    "21": "Kentucky",
    "22": "Louisiana",
    "23": "Maine",
    "24": "Maryland",
    "25": "Massachusetts",
    "26": "Michigan",
    "27": "Minnesota",
    "28": "Mississippi",
    "29": "Missouri",
    "30": "Montana",
    "31": "Nebraska",
    "32": "Nevada",
    "33": "New Hampshire",
    "34": "New Jersey",
    "35": "New Mexico",
    "36": "New York",
    "37": "North Carolina",
    "38": "North Dakota",
    "39": "Ohio",
    "40": "Oklahoma",
    "41": "Oregon",
    "42": "Pennsylvania",
    "44": "Rhode Island",
    "45": "South Carolina",
    "46": "South Dakota",
    "47": "Tennessee",
    "48": "Texas",
    "49": "Utah",
    "50": "Vermont",
    "51": "Virginia",
    "53": "Washington",
    "54": "West Virginia",
    "55": "Wisconsin",
    "56": "Wyoming",
  };

const STATE_DATA: StateTaxDatum[] = [
  { name: "Alabama", abbr: "AL", ratePct: 0.41, medianHomeValue: 192700 },
  { name: "Alaska", abbr: "AK", ratePct: 0.94, medianHomeValue: 318000 },
  { name: "Arizona", abbr: "AZ", ratePct: 0.41, medianHomeValue: 337300 },
  { name: "Arkansas", abbr: "AR", ratePct: 0.6, medianHomeValue: 173800, href: AVAILABLE_CALCULATOR_HREFS["Arkansas"] },
  { name: "California", abbr: "CA", ratePct: 0.69, medianHomeValue: 659300 },
  { name: "Colorado", abbr: "CO", ratePct: 0.48, medianHomeValue: 501500 },
  { name: "Connecticut", abbr: "CT", ratePct: 1.73, medianHomeValue: 340600 },
  { name: "Delaware", abbr: "DE", ratePct: 0.58, medianHomeValue: 330500 },
  { name: "Florida", abbr: "FL", ratePct: 0.86, medianHomeValue: 292200 },
  { name: "Georgia", abbr: "GA", ratePct: 0.92, medianHomeValue: 245900 },
  { name: "Hawaii", abbr: "HI", ratePct: 0.32, medianHomeValue: 764800 },
  { name: "Idaho", abbr: "ID", ratePct: 0.69, medianHomeValue: 331600 },
  { name: "Illinois", abbr: "IL", ratePct: 1.97, medianHomeValue: 239100 },
  { name: "Indiana", abbr: "IN", ratePct: 0.85, medianHomeValue: 191000 },
  { name: "Iowa", abbr: "IA", ratePct: 1.29, medianHomeValue: 188800 },
  { name: "Kansas", abbr: "KS", ratePct: 1.41, medianHomeValue: 189300, href: AVAILABLE_CALCULATOR_HREFS["Kansas"] },
  { name: "Kentucky", abbr: "KY", ratePct: 0.78, medianHomeValue: 179900, href: AVAILABLE_CALCULATOR_HREFS["Kentucky"] },
  { name: "Louisiana", abbr: "LA", ratePct: 0.55, medianHomeValue: 196800 },
  { name: "Maine", abbr: "ME", ratePct: 1.28, medianHomeValue: 291800 },
  { name: "Maryland", abbr: "MD", ratePct: 1.09, medianHomeValue: 428100 },
  { name: "Massachusetts", abbr: "MA", ratePct: 1.23, medianHomeValue: 518100 },
  { name: "Michigan", abbr: "MI", ratePct: 1.54, medianHomeValue: 196000, href: AVAILABLE_CALCULATOR_HREFS["Michigan"] },
  { name: "Minnesota", abbr: "MN", ratePct: 1.12, medianHomeValue: 314600 },
  { name: "Mississippi", abbr: "MS", ratePct: 0.65, medianHomeValue: 158000 },
  { name: "Missouri", abbr: "MO", ratePct: 0.97, medianHomeValue: 197700 },
  { name: "Montana", abbr: "MT", ratePct: 0.84, medianHomeValue: 397500 },
  { name: "Nebraska", abbr: "NE", ratePct: 1.63, medianHomeValue: 217800 },
  { name: "Nevada", abbr: "NV", ratePct: 0.6, medianHomeValue: 391800 },
  { name: "New Hampshire", abbr: "NH", ratePct: 1.89, medianHomeValue: 391300 },
  { name: "New Jersey", abbr: "NJ", ratePct: 2.13, medianHomeValue: 401400 },
  { name: "New Mexico", abbr: "NM", ratePct: 0.8, medianHomeValue: 248600 },
  { name: "New York", abbr: "NY", ratePct: 1.72, medianHomeValue: 399900 },
  { name: "North Carolina", abbr: "NC", ratePct: 0.84, medianHomeValue: 259400 },
  { name: "North Dakota", abbr: "ND", ratePct: 0.99, medianHomeValue: 242100 },
  { name: "Ohio", abbr: "OH", ratePct: 1.52, medianHomeValue: 183300 },
  { name: "Oklahoma", abbr: "OK", ratePct: 0.9, medianHomeValue: 178800 },
  { name: "Oregon", abbr: "OR", ratePct: 0.97, medianHomeValue: 429300 },
  { name: "Pennsylvania", abbr: "PA", ratePct: 1.49, medianHomeValue: 234000 },
  { name: "Rhode Island", abbr: "RI", ratePct: 1.53, medianHomeValue: 385400 },
  { name: "South Carolina", abbr: "SC", ratePct: 0.57, medianHomeValue: 246000 },
  { name: "South Dakota", abbr: "SD", ratePct: 1.22, medianHomeValue: 253900, href: AVAILABLE_CALCULATOR_HREFS["South Dakota"] },
  { name: "Tennessee", abbr: "TN", ratePct: 0.63, medianHomeValue: 245100 },
  { name: "Texas", abbr: "TX", ratePct: 1.6, medianHomeValue: 237400 },
  { name: "Utah", abbr: "UT", ratePct: 0.56, medianHomeValue: 468300 },
  { name: "Vermont", abbr: "VT", ratePct: 1.76, medianHomeValue: 316900, href: AVAILABLE_CALCULATOR_HREFS["Vermont"] },
  { name: "Virginia", abbr: "VA", ratePct: 0.8, medianHomeValue: 345200, href: AVAILABLE_CALCULATOR_HREFS["Virginia"] },
  { name: "Washington", abbr: "WA", ratePct: 0.98, medianHomeValue: 493900 },
  { name: "West Virginia", abbr: "WV", ratePct: 0.53, medianHomeValue: 155200, href: AVAILABLE_CALCULATOR_HREFS["West Virginia"] },
  { name: "Wisconsin", abbr: "WI", ratePct: 1.68, medianHomeValue: 233100, href: AVAILABLE_CALCULATOR_HREFS["Wisconsin"] },
  { name: "Wyoming", abbr: "WY", ratePct: 0.51, medianHomeValue: 308500, href: AVAILABLE_CALCULATOR_HREFS["Wyoming"] },
];

type HoverState = {
  name: string;
  abbr: string;
  annualCost: number;
  monthlyCost: number;
  ratePct: number;
  medianHomeValue: number;
  href?: string;
};

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function annualCost(ratePct: number, medianHomeValue: number) {
  return Math.round((ratePct / 100) * medianHomeValue);
}

function monthlyCost(ratePct: number, medianHomeValue: number) {
  return Math.round(annualCost(ratePct, medianHomeValue) / 12);
}

function interpolateColor(start: [number, number, number], end: [number, number, number], factor: number) {
  const clamped = Math.max(0, Math.min(1, factor));
  const r = Math.round(start[0] + (end[0] - start[0]) * clamped);
  const g = Math.round(start[1] + (end[1] - start[1]) * clamped);
  const b = Math.round(start[2] + (end[2] - start[2]) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
}

function slugifyState(name: string) {
  return name.toLowerCase().replaceAll(" ", "-");
}

function getStateHref(name: StateName) {
  return AVAILABLE_CALCULATOR_HREFS[name] ?? `/tools/property-tax/${slugifyState(name)}`;
}

export default function PropertyTaxCostMap() {

  const [hovered, setHovered] = useState<HoverState | null>(null);

  const dataByState = useMemo(() => {
    return Object.fromEntries(
      STATE_DATA.map((state) => {
        const annual = annualCost(state.ratePct, state.medianHomeValue);
        const monthly = Math.round(annual / 12);

        return [
          state.name,
          {
            ...state,
            annualCost: annual,
            monthlyCost: monthly,
            href: state.href,
          },
        ];
      }),
    ) as Record<
      StateName,
      StateTaxDatum & { annualCost: number; monthlyCost: number; href?: string }
    >;
  }, []);

  const annualValues = useMemo(
    () => STATE_DATA.map((state) => annualCost(state.ratePct, state.medianHomeValue)),
    [],
  );

  const minAnnual = Math.min(...annualValues);
  const maxAnnual = Math.max(...annualValues);

  const getFill = (name?: string) => {
    if (!name || !(name in dataByState)) return "#e5e7eb";

    const datum = dataByState[name as StateName];
    const ratio = (datum.annualCost - minAnnual) / (maxAnnual - minAnnual || 1);

    // light blue -> deep navy
    return interpolateColor([219, 234, 254], [30, 64, 175], ratio);
  };

  const onStateEnter = (name?: string) => {
    if (!name || !(name in dataByState)) {
      setHovered(null);
      return;
    }

    const datum = dataByState[name as StateName];
    setHovered({
      name: datum.name,
      abbr: datum.abbr,
      annualCost: datum.annualCost,
      monthlyCost: datum.monthlyCost,
      ratePct: datum.ratePct,
      medianHomeValue: datum.medianHomeValue,
      href: datum.href,
    });
  };

  const onStateLeave = () => {
    setHovered(null);
  };

  const onStateClick = (name?: string) => {
    if (!name || !(name in dataByState)) return;
  
    const datum = dataByState[name as StateName];
  
    if (!datum.href) return;
  
    window.location.assign(datum.href);
  };

  return (
    <section className="mb-14 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Property Tax Cost by State (Map)
        </h2>
        <p className="mt-2 max-w-4xl text-slate-700">
          This interactive map visualizes the estimated annual property tax cost across all 50
          U.S. states. States with live Lavigate property tax calculator pages are clickable.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <ComposableMap
            projection="geoAlbersUsa"
            width={980}
            height={600}
            className="h-auto w-full"
            aria-label="Map of estimated annual property tax cost by state"
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo, index) => {
                    const stateName = FIPS_TO_STATE[String(geo.id).padStart(2, "0")];
                  const datum =
                    stateName && stateName in dataByState
                      ? dataByState[stateName as StateName]
                      : undefined;
                  const clickable = Boolean(datum?.href);

                  return (
                    <Geography
                      key={`${geo.id}-${index}`}
                      geography={geo}
                      onMouseEnter={() => onStateEnter(stateName)}
                      onMouseLeave={onStateLeave}
                      onFocus={() => onStateEnter(stateName)}
                      onBlur={onStateLeave}
                      onClick={() => onStateClick(stateName)}
onMouseUp={() => onStateClick(stateName)}
onTouchEnd={() => onStateClick(stateName)}
onKeyDown={(event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onStateClick(stateName);
  }
}}
tabIndex={clickable ? 0 : -1}
role={clickable ? "link" : undefined}
                      style={{
                        default: {
                          fill: getFill(stateName),
                          stroke: clickable ? "#0f172a" : "#ffffff",
                          strokeWidth: clickable ? 1.2 : 0.8,
                          outline: "none",
                          cursor: clickable ? "pointer" : "default",
                          pointerEvents: "all",
                        },
                        hover: {
                          fill: "#0f172a",
                          stroke: "#ffffff",
                          strokeWidth: 1.2,
                          outline: "none",
                          cursor: clickable ? "pointer" : "default",
                          pointerEvents: "all",
                        },
                        pressed: {
                          fill: "#1d4ed8",
                          stroke: "#ffffff",
                          strokeWidth: 1.2,
                          outline: "none",
                          cursor: clickable ? "pointer" : "default",
                          pointerEvents: "all",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-medium text-slate-500">Legend</div>
            <div className="mt-4 h-3 w-full rounded-full bg-gradient-to-r from-blue-100 to-blue-800" />
            <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
              <span>{currency(minAnnual)}</span>
              <span>{currency(maxAnnual)}</span>
            </div>
          </div>

          <div className="min-h-[220px] rounded-xl border border-slate-200 bg-white p-5">
            {!hovered ? (
              <>
                <div className="text-sm font-medium text-slate-500">Hover a state</div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Hover over a state to see its estimated annual property tax cost, monthly cost,
                  effective tax rate, and median home value.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  States with live Lavigate property tax pages can be clicked from the map.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{hovered.name}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {hovered.abbr}
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Annual cost
                    </div>
                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      {currency(hovered.annualCost)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Monthly cost
                    </div>
                    <div className="mt-1 text-xl font-semibold text-slate-900">
                      {currency(hovered.monthlyCost)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Tax rate
                      </div>
                      <div className="mt-1 text-lg font-semibold text-slate-900">
                        {hovered.ratePct.toFixed(2)}%
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Median home
                      </div>
                      <div className="mt-1 text-lg font-semibold text-slate-900">
                        {currency(hovered.medianHomeValue)}
                      </div>
                    </div>
                  </div>

                  {hovered.href ? (
  <div className="mt-3 rounded-lg border border-dashed border-slate-200 px-4 py-2 text-center text-sm text-slate-500">
    Click the state on the map to open the live Lavigate calculator
  </div>
) : (
  <div className="mt-3 rounded-lg border border-dashed border-slate-200 px-4 py-2 text-center text-sm text-slate-500">
    No live Lavigate calculator page for this state yet
  </div>
)}
                </div>
              </>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-medium text-slate-500">How it works</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              <li>Annual cost = effective property tax rate × median home value</li>
              <li>Monthly cost = annual cost ÷ 12</li>
              <li>Map colors are based on estimated annual property tax cost</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}