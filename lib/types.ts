// ============================================================
// WeDo Travels – Quote System Types
// ============================================================

export type MoveType = "home" | "office" | "partial" | "storage";

export type FlexibilityOption =
  | "exact"
  | "few_days"
  | "week"
  | "flexible";

export type PackingStatus =
  | "not_packed"
  | "partly_packed"
  | "mostly_packed"
  | "ready_to_load";

export interface AddressDetails {
  eircode: string;
  address: string;
  city: string;
  county: string;
  floor: string;
  liftAvailable: boolean;
}

export interface QuoteFormData {
  // Step 1
  moveType: MoveType | null;

  // Step 2
  bedrooms: string;
  livingRooms: string;

  // Step 3
  quantities: {
    beds: number;
    sofas: number;
    tables: number;
    wardrobes: number;
    appliances: number;
    boxes: number;
  };

  // Step 4 – Moving From
  from: AddressDetails;

  // Step 5 – Moving To
  to: AddressDetails;
  preferredDate: string;
  flexibility: FlexibilityOption;

  // Step 6 – Ready status
  packingStatus: PackingStatus | null;
  needsRide: boolean;
  extraDetails: string;

  // Step 7 – Contact
  fullName: string;
  email: string;
  phone: string;
}

export const INITIAL_FORM_DATA: QuoteFormData = {
  moveType: null,
  bedrooms: "1",
  livingRooms: "1",
  quantities: {
    beds: 0,
    sofas: 0,
    tables: 0,
    wardrobes: 0,
    appliances: 0,
    boxes: 0,
  },
  from: {
    eircode: "",
    address: "",
    city: "",
    county: "",
    floor: "Ground",
    liftAvailable: false,
  },
  to: {
    eircode: "",
    address: "",
    city: "",
    county: "",
    floor: "Ground",
    liftAvailable: false,
  },
  preferredDate: "",
  flexibility: "few_days",
  packingStatus: null,
  needsRide: false,
  extraDetails: "",
  fullName: "",
  email: "",
  phone: "",
};

export const IRELAND_COUNTIES = [
  "Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork",
  "Derry", "Donegal", "Down", "Dublin", "Fermanagh",
  "Galway", "Kerry", "Kildare", "Kilkenny", "Laois",
  "Leitrim", "Limerick", "Longford", "Louth", "Mayo",
  "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo",
  "Tipperary", "Tyrone", "Waterford", "Westmeath",
  "Wexford", "Wicklow",
];

export const FLOOR_OPTIONS = [
  "Ground", "1st", "2nd", "3rd", "4th", "5th+",
];

export const FLEXIBILITY_OPTIONS: { value: FlexibilityOption; label: string }[] = [
  { value: "exact", label: "Exact date only" },
  { value: "few_days", label: "± a few days" },
  { value: "week", label: "± a week" },
  { value: "flexible", label: "Very flexible" },
];
