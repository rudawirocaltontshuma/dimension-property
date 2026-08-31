// Nexora Property — colocated in-memory mock data.
// This entire product is a frontend-only demonstration: nothing here is persisted,
// fetched from a network, or backed by a real database, auth, or payment provider.

export type PropertyType = "Residential" | "Commercial" | "Industrial" | "Mixed Use";
export type PropertyStatus = "Active" | "Under Renovation" | "Inactive";

export type UnitType =
  | "Studio"
  | "1 Bedroom"
  | "2 Bedroom"
  | "3 Bedroom"
  | "Office Suite"
  | "Retail Bay"
  | "Warehouse Bay";
export type UnitStatus = "Occupied" | "Vacant" | "Reserved" | "Maintenance";

export type LeaseStatus = "Active" | "Expiring" | "Expired" | "Pending";
export type ApplicationStatus = "New" | "Review" | "Approved" | "Rejected";
export type MaintenanceStatus = "Reported" | "Scheduled" | "In Progress" | "Waiting" | "Completed";
export type MaintenancePriority = "Low" | "Medium" | "High" | "Urgent";
export type InspectionStatus = "Scheduled" | "Completed" | "Overdue";
export type InspectionResult = "Pass" | "Pass with Notes" | "Fail" | "Pending";
export type ExpenseStatus = "Paid" | "Pending" | "Overdue";
export type VendorStatus = "Active" | "Preferred" | "Inactive";
export type DocumentCategory =
  | "Leases"
  | "Inspections"
  | "Maintenance"
  | "Property Documents"
  | "Invoices"
  | "Certificates";
export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

// Deterministic pseudo-random generator so server and client render identically.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const pick = <T>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(min + rand() * (max - min + 1));

const cities = [
  { city: "Austin", state: "TX" },
  { city: "Denver", state: "CO" },
  { city: "Charlotte", state: "NC" },
  { city: "Seattle", state: "WA" },
  { city: "Phoenix", state: "AZ" },
  { city: "Nashville", state: "TN" },
  { city: "Chicago", state: "IL" },
  { city: "Atlanta", state: "GA" },
  { city: "Portland", state: "OR" },
  { city: "Miami", state: "FL" },
  { city: "Boston", state: "MA" },
  { city: "Raleigh", state: "NC" },
];

const streetNames = [
  "Cedar Ridge",
  "Willow Creek",
  "Harborview",
  "Maple Grove",
  "Summit Park",
  "Lakeside",
  "Founders",
  "Riverbend",
  "Highland",
  "Meadowbrook",
  "Stonegate",
  "Brookhaven",
];

const propertyNames = [
  "Cedar Ridge Apartments",
  "Willow Creek Residences",
  "Harborview Tower",
  "Maple Grove Flats",
  "Summit Park Lofts",
  "Lakeside Commons",
  "Founders Square Plaza",
  "Riverbend Business Park",
  "Highland Court",
  "Meadowbrook Village",
  "Stonegate Industrial Center",
  "Brookhaven Mixed Commons",
  "The Ridgeline",
  "Pinehurst Gardens",
];

const propertyManagers = [
  "Alicia Moreno",
  "Devon Clarke",
  "Priya Nair",
  "Marcus Webb",
  "Sofia Alvarez",
  "Tom Whitfield",
];

const firstNames = [
  "James",
  "Maria",
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Ethan",
  "Ava",
  "Lucas",
  "Mia",
  "Mason",
  "Isabella",
  "Elijah",
  "Sophia",
  "Logan",
  "Amelia",
  "Aiden",
  "Harper",
  "Jack",
  "Evelyn",
  "Owen",
  "Abigail",
  "Wyatt",
  "Ella",
  "Julian",
  "Scarlett",
  "Levi",
  "Grace",
  "Carter",
  "Chloe",
  "Ruben",
  "Nadia",
  "Felix",
  "Yara",
  "Dante",
  "Priscilla",
  "Omar",
  "Lena",
  "Theo",
  "Ines",
];
const lastNames = [
  "Anderson",
  "Brooks",
  "Castillo",
  "Delgado",
  "Ellison",
  "Fischer",
  "Garrison",
  "Hughes",
  "Ibarra",
  "Jansen",
  "Kowalski",
  "Lambert",
  "Mercer",
  "Nguyen",
  "O'Brien",
  "Patterson",
  "Quinn",
  "Reyes",
  "Sinclair",
  "Tanaka",
  "Underwood",
  "Vasquez",
  "Whitmore",
  "Xu",
  "Yamada",
  "Zimmer",
];

const vendorCompanies = [
  { name: "Apex HVAC Services", service: "HVAC" },
  { name: "BrightSpark Electrical", service: "Electrical" },
  { name: "ClearFlow Plumbing Co.", service: "Plumbing" },
  { name: "GreenScape Landscaping", service: "Landscaping" },
  { name: "SecureGate Locksmiths", service: "Locksmith & Security" },
  { name: "Pristine Cleaning Crew", service: "Janitorial" },
  { name: "SafeGuard Pest Control", service: "Pest Control" },
  { name: "TopCoat Painting", service: "Painting" },
  { name: "IronWorks General Contracting", service: "General Contracting" },
  { name: "FreshAir Appliance Repair", service: "Appliance Repair" },
];

function fullName() {
  return `${pick(firstNames)} ${pick(lastNames)}`;
}

function addressFor(index: number) {
  const loc = cities[index % cities.length];
  const street = streetNames[index % streetNames.length];
  return `${100 + index * 12} ${street} ${index % 2 === 0 ? "Ave" : "Blvd"}, ${loc.city}, ${loc.state}`;
}

export type Property = {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  state: string;
  units: number;
  yearBuilt: number;
  manager: string;
  status: PropertyStatus;
  occupancyRate: number;
  monthlyRevenue: number;
  imageColor: string;
};

const imageColors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"];

export const properties: Property[] = propertyNames.map((name, i) => {
  const loc = cities[i % cities.length];
  const type: PropertyType = pick(["Residential", "Residential", "Commercial", "Industrial", "Mixed Use"] as const);
  let units: number;
  let rentPerUnit: number;
  if (type === "Industrial") {
    units = randInt(4, 10);
    rentPerUnit = randInt(2200, 4200);
  } else if (type === "Commercial") {
    units = randInt(10, 30);
    rentPerUnit = randInt(1800, 3600);
  } else {
    units = randInt(20, 60);
    rentPerUnit = randInt(1100, 2600);
  }
  const occupancyRate = randInt(72, 100);
  return {
    id: `PRP-${String(i + 1).padStart(3, "0")}`,
    name,
    type,
    address: addressFor(i),
    city: loc.city,
    state: loc.state,
    units,
    yearBuilt: randInt(1985, 2021),
    manager: pick(propertyManagers),
    status: pick(["Active", "Active", "Active", "Active", "Under Renovation", "Inactive"] as const),
    occupancyRate,
    monthlyRevenue: Math.round((units * occupancyRate * rentPerUnit) / 100),
    imageColor: imageColors[i % imageColors.length],
  };
});

export type Unit = {
  id: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  type: UnitType;
  floor: number;
  sqft: number;
  rent: number;
  status: UnitStatus;
  tenantId?: string;
  tenantName?: string;
};

const residentialUnitTypes: UnitType[] = ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom"];
const commercialUnitTypes: UnitType[] = ["Office Suite", "Retail Bay"];
const industrialUnitTypes: UnitType[] = ["Warehouse Bay"];

export const units: Unit[] = [];
let unitCounter = 1;
for (const property of properties) {
  let unitTypes: UnitType[];
  if (property.type === "Residential") unitTypes = residentialUnitTypes;
  else if (property.type === "Commercial") unitTypes = commercialUnitTypes;
  else if (property.type === "Industrial") unitTypes = industrialUnitTypes;
  else unitTypes = [...residentialUnitTypes, ...commercialUnitTypes];

  const baseRentByType: Record<UnitType, number> = {
    Studio: 1050,
    "1 Bedroom": 1350,
    "2 Bedroom": 1750,
    "3 Bedroom": 2150,
    "Office Suite": 2600,
    "Retail Bay": 3200,
    "Warehouse Bay": 3800,
  };

  for (let u = 0; u < property.units; u++) {
    const type = pick(unitTypes);
    const base = baseRentByType[type];
    const isOccupied = rand() * 100 < property.occupancyRate;
    const status: UnitStatus = isOccupied ? "Occupied" : pick(["Vacant", "Vacant", "Reserved", "Maintenance"] as const);
    units.push({
      id: `UNT-${String(unitCounter).padStart(4, "0")}`,
      propertyId: property.id,
      propertyName: property.name,
      unitNumber: `${randInt(1, 9)}${String(u + 1).padStart(2, "0")}`,
      type,
      floor: randInt(1, 9),
      sqft: base - 400 + randInt(0, 300),
      rent: base + randInt(-120, 220),
      status,
    });
    unitCounter++;
  }
}

export type Tenant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitNumber: string;
  leaseId: string;
  rent: number;
  leaseStart: string;
  leaseEnd: string;
  status: "Active" | "Past" | "Notice Given";
  balance: number;
};

export const tenants: Tenant[] = [];
const occupiedUnits = units.filter((u) => u.status === "Occupied");
occupiedUnits.forEach((unit, i) => {
  const name = fullName();
  const leaseStartYear = 2023 + randInt(0, 2);
  const leaseStart = `${leaseStartYear}-${String(randInt(1, 12)).padStart(2, "0")}-01`;
  const leaseEndDate = new Date(leaseStartYear + 1, randInt(0, 11), 1);
  const leaseEnd = leaseEndDate.toISOString().slice(0, 10);
  const tenantId = `TEN-${String(i + 1).padStart(4, "0")}`;
  const leaseId = `LSE-${String(i + 1).padStart(4, "0")}`;
  const status = pick(["Active", "Active", "Active", "Active", "Notice Given", "Past"] as const);
  const tenant: Tenant = {
    id: tenantId,
    name,
    email: `${name
      .toLowerCase()
      .replace(/[^a-z ]/g, "")
      .replace(/\s+/g, ".")}@mailbox.dev`,
    phone: `(${randInt(200, 989)}) ${randInt(200, 989)}-${String(randInt(0, 9999)).padStart(4, "0")}`,
    propertyId: unit.propertyId,
    propertyName: unit.propertyName,
    unitId: unit.id,
    unitNumber: unit.unitNumber,
    leaseId,
    rent: unit.rent,
    leaseStart,
    leaseEnd,
    status,
    balance: rand() < 0.25 ? randInt(50, 1200) : 0,
  };
  tenants.push(tenant);
  unit.tenantId = tenantId;
  unit.tenantName = name;
});

export type Lease = {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitNumber: string;
  start: string;
  end: string;
  rent: number;
  status: LeaseStatus;
  term: string;
};

const today = new Date("2026-08-31");
function daysUntil(dateStr: string) {
  return Math.round((new Date(dateStr).getTime() - today.getTime()) / 86_400_000);
}

export const leases: Lease[] = tenants.map((tenant) => {
  const daysLeft = daysUntil(tenant.leaseEnd);
  let status: LeaseStatus = "Active";
  if (tenant.status === "Past") status = "Expired";
  else if (daysLeft < 0) status = "Expired";
  else if (daysLeft <= 60) status = "Expiring";
  return {
    id: tenant.leaseId,
    tenantId: tenant.id,
    tenantName: tenant.name,
    propertyId: tenant.propertyId,
    propertyName: tenant.propertyName,
    unitId: tenant.unitId,
    unitNumber: tenant.unitNumber,
    start: tenant.leaseStart,
    end: tenant.leaseEnd,
    rent: tenant.rent,
    status,
    term: "12 months",
  };
});

// A handful of purely-pending leases for applicants not yet tenants.
const vacantUnits = units.filter((u) => u.status === "Vacant").slice(0, 8);
vacantUnits.forEach((unit, i) => {
  const name = fullName();
  leases.push({
    id: `LSE-P${String(i + 1).padStart(3, "0")}`,
    tenantId: `PEND-${i + 1}`,
    tenantName: name,
    propertyId: unit.propertyId,
    propertyName: unit.propertyName,
    unitId: unit.id,
    unitNumber: unit.unitNumber,
    start: "2026-09-15",
    end: "2027-09-14",
    rent: unit.rent,
    status: "Pending",
    term: "12 months",
  });
});

export type Applicant = {
  id: string;
  name: string;
  email: string;
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitNumber: string;
  applicationDate: string;
  score: number;
  income: number;
  status: ApplicationStatus;
};

export const applicants: Applicant[] = Array.from({ length: 34 }, (_, i) => {
  const unit = pick(vacantUnits.length ? vacantUnits : units);
  const name = fullName();
  return {
    id: `APP-${String(i + 1).padStart(4, "0")}`,
    name,
    email: `${name
      .toLowerCase()
      .replace(/[^a-z ]/g, "")
      .replace(/\s+/g, ".")}@inbox.dev`,
    propertyId: unit.propertyId,
    propertyName: unit.propertyName,
    unitId: unit.id,
    unitNumber: unit.unitNumber,
    applicationDate: `2026-0${randInt(6, 8)}-${String(randInt(1, 28)).padStart(2, "0")}`,
    score: randInt(560, 820),
    income: randInt(38000, 145000),
    status: pick(["New", "Review", "Review", "Approved", "Rejected"] as const),
  };
});

export type MaintenanceRequest = {
  id: string;
  issue: string;
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitNumber: string;
  priority: MaintenancePriority;
  vendor: string;
  cost: number;
  status: MaintenanceStatus;
  reportedDate: string;
  category: string;
};

const maintenanceIssues = [
  "Leaking kitchen faucet",
  "HVAC not cooling",
  "Broken window latch",
  "Elevator making noise",
  "Clogged drain",
  "Electrical outlet not working",
  "Pest sighting reported",
  "Water heater failure",
  "Garage door malfunction",
  "Smoke detector chirping",
  "Roof leak",
  "Parking lot pothole",
  "Common area lighting out",
  "Dishwasher not draining",
  "Mailbox lock broken",
  "AC unit icing over",
  "Fire extinguisher expired",
  "Carpet stain removal",
  "Cracked bathroom tile",
  "Gate access malfunction",
];
const maintenanceCategories = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Structural",
  "Appliance",
  "Safety",
  "Landscaping",
  "General",
];

export const maintenanceRequests: MaintenanceRequest[] = Array.from({ length: 58 }, (_, i) => {
  const unit = pick(units);
  const status = pick([
    "Reported",
    "Scheduled",
    "In Progress",
    "In Progress",
    "Waiting",
    "Completed",
    "Completed",
  ] as const);
  return {
    id: `WO-${String(i + 1).padStart(4, "0")}`,
    issue: pick(maintenanceIssues),
    propertyId: unit.propertyId,
    propertyName: unit.propertyName,
    unitId: unit.id,
    unitNumber: unit.unitNumber,
    priority: pick(["Low", "Medium", "Medium", "High", "Urgent"] as const),
    vendor: pick(vendorCompanies).name,
    cost: randInt(60, 3200),
    status,
    reportedDate: `2026-0${randInt(5, 8)}-${String(randInt(1, 28)).padStart(2, "0")}`,
    category: pick(maintenanceCategories),
  };
});

export type Inspection = {
  id: string;
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitNumber: string;
  date: string;
  inspector: string;
  type: string;
  result: InspectionResult;
  status: InspectionStatus;
};

const inspectors = ["Rachel Kim", "Boone Fletcher", "Nadia Osei", "Trent Cabrera", "Wendy Solis"];
const inspectionTypes = ["Move-in", "Move-out", "Routine", "Annual Safety", "Fire Marshal"];

export const inspections: Inspection[] = Array.from({ length: 42 }, (_, i) => {
  const unit = pick(units);
  const status: InspectionStatus = pick(["Completed", "Completed", "Completed", "Scheduled", "Overdue"] as const);
  return {
    id: `INS-${String(i + 1).padStart(4, "0")}`,
    propertyId: unit.propertyId,
    propertyName: unit.propertyName,
    unitId: unit.id,
    unitNumber: unit.unitNumber,
    date: `2026-${String(randInt(3, 9)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}`,
    inspector: pick(inspectors),
    type: pick(inspectionTypes),
    result: status === "Completed" ? pick(["Pass", "Pass", "Pass with Notes", "Fail"] as const) : "Pending",
    status,
  };
});

export type Expense = {
  id: string;
  propertyId: string;
  propertyName: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
};

const expenseCategories = [
  "Maintenance",
  "Utilities",
  "Insurance",
  "Property Tax",
  "Landscaping",
  "Cleaning",
  "Marketing",
  "Management Fees",
  "Repairs",
  "Supplies",
];

export const expenses: Expense[] = Array.from({ length: 96 }, (_, i) => {
  const property = pick(properties);
  const category = pick(expenseCategories);
  return {
    id: `EXP-${String(i + 1).padStart(4, "0")}`,
    propertyId: property.id,
    propertyName: property.name,
    category,
    description: `${category} — ${property.name}`,
    amount: randInt(120, 9800),
    date: `2026-${String(randInt(1, 8)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}`,
    status: pick(["Paid", "Paid", "Paid", "Pending", "Overdue"] as const),
  };
});

export type Vendor = {
  id: string;
  name: string;
  service: string;
  properties: number;
  openJobs: number;
  performance: number;
  status: VendorStatus;
  phone: string;
  email: string;
};

export const vendors: Vendor[] = vendorCompanies.map((v, i) => ({
  id: `VND-${String(i + 1).padStart(3, "0")}`,
  name: v.name,
  service: v.service,
  properties: randInt(3, 12),
  openJobs: maintenanceRequests.filter((m) => m.vendor === v.name && m.status !== "Completed").length,
  performance: randInt(78, 99),
  status: pick(["Preferred", "Active", "Active", "Active", "Inactive"] as const),
  phone: `(${randInt(200, 989)}) ${randInt(200, 989)}-${String(randInt(0, 9999)).padStart(4, "0")}`,
  email: `contact@${
    v.name
      .toLowerCase()
      .replace(/[^a-z ]/g, "")
      .split(" ")[0]
  }.dev`,
}));

export type PropertyDocument = {
  id: string;
  name: string;
  category: DocumentCategory;
  propertyId: string;
  propertyName: string;
  uploadedDate: string;
  size: string;
  fileType: "pdf" | "docx" | "xlsx" | "jpg";
};

const docCategories: DocumentCategory[] = [
  "Leases",
  "Inspections",
  "Maintenance",
  "Property Documents",
  "Invoices",
  "Certificates",
];
const docNameByCategory: Record<DocumentCategory, string[]> = {
  Leases: ["Lease Agreement", "Lease Renewal", "Lease Addendum"],
  Inspections: ["Move-in Inspection Report", "Annual Inspection Report", "Fire Safety Inspection"],
  Maintenance: ["Work Order Summary", "Vendor Invoice", "Repair Completion Report"],
  "Property Documents": ["Title Deed", "Property Survey", "Zoning Certificate"],
  Invoices: ["Utility Invoice", "Vendor Invoice", "Management Fee Invoice"],
  Certificates: ["Insurance Certificate", "Occupancy Certificate", "Fire Safety Certificate"],
};
const fileTypes: PropertyDocument["fileType"][] = ["pdf", "pdf", "docx", "xlsx", "jpg"];

export const documents: PropertyDocument[] = Array.from({ length: 64 }, (_, i) => {
  const category = docCategories[i % docCategories.length];
  const property = pick(properties);
  return {
    id: `DOC-${String(i + 1).padStart(4, "0")}`,
    name: `${pick(docNameByCategory[category])} #${randInt(100, 999)}`,
    category,
    propertyId: property.id,
    propertyName: property.name,
    uploadedDate: `2026-${String(randInt(1, 8)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}`,
    size: `${(rand() * 4 + 0.2).toFixed(1)} MB`,
    fileType: pick(fileTypes),
  };
});

export type PropertyTask = {
  id: string;
  title: string;
  propertyId?: string;
  propertyName?: string;
  assignee: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
};

const taskTitles = [
  "Renew fire safety certificate",
  "Follow up with delinquent tenant",
  "Schedule Q3 property inspections",
  "Review vendor contracts",
  "Post vacancy listing",
  "Approve pending applications",
  "Prepare monthly owner report",
  "Coordinate move-out walkthrough",
  "Update insurance policy",
  "Audit maintenance backlog",
  "Plan landscaping refresh",
  "Reconcile expense ledger",
  "Send lease renewal notices",
  "Schedule HVAC preventive maintenance",
  "Update tenant handbook",
];

export const tasks: PropertyTask[] = taskTitles.map((title, i) => {
  const property = pick(properties);
  return {
    id: `TSK-${String(i + 1).padStart(3, "0")}`,
    title,
    propertyId: property.id,
    propertyName: property.name,
    assignee: pick(propertyManagers),
    dueDate: `2026-0${randInt(8, 9)}-${String(randInt(1, 28)).padStart(2, "0")}`,
    priority: pick(["Low", "Medium", "High"] as const),
    status: pick(["To Do", "To Do", "In Progress", "Done"] as const),
  };
});

// ---------- Derived / aggregate metrics ----------

export const totalProperties = properties.length;
export const totalUnits = units.length;
export const occupiedUnitsCount = units.filter((u) => u.status === "Occupied").length;
export const vacantUnitsCount = units.filter((u) => u.status === "Vacant").length;
export const reservedUnitsCount = units.filter((u) => u.status === "Reserved").length;
export const maintenanceUnitsCount = units.filter((u) => u.status === "Maintenance").length;
export const occupancyRate = Math.round((occupiedUnitsCount / totalUnits) * 1000) / 10;
export const monthlyRent = units.filter((u) => u.status === "Occupied").reduce((sum, u) => sum + u.rent, 0);
export const outstandingRent = tenants.reduce((sum, t) => sum + t.balance, 0);
export const openMaintenanceCount = maintenanceRequests.filter((m) => m.status !== "Completed").length;
export const expiringLeasesCount = leases.filter((l) => l.status === "Expiring").length;

export const occupancyTrend = [
  { month: "Mar", occupancy: 88.4 },
  { month: "Apr", occupancy: 89.1 },
  { month: "May", occupancy: 90.6 },
  { month: "Jun", occupancy: 91.8 },
  { month: "Jul", occupancy: 92.4 },
  { month: "Aug", occupancy: occupancyRate },
];

export const rentalRevenueTrend = [
  { month: "Mar", revenue: Math.round(monthlyRent * 0.9), expenses: Math.round(monthlyRent * 0.32) },
  { month: "Apr", revenue: Math.round(monthlyRent * 0.93), expenses: Math.round(monthlyRent * 0.3) },
  { month: "May", revenue: Math.round(monthlyRent * 0.96), expenses: Math.round(monthlyRent * 0.35) },
  { month: "Jun", revenue: Math.round(monthlyRent * 0.98), expenses: Math.round(monthlyRent * 0.29) },
  { month: "Jul", revenue: Math.round(monthlyRent * 0.99), expenses: Math.round(monthlyRent * 0.33) },
  { month: "Aug", revenue: monthlyRent, expenses: Math.round(monthlyRent * 0.31) },
];

export const propertyPerformance = properties
  .slice()
  .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
  .slice(0, 8)
  .map((p) => ({
    name: p.name.split(" ").slice(0, 2).join(" "),
    revenue: p.monthlyRevenue,
    occupancy: p.occupancyRate,
  }));

export const maintenanceCostTrend = [
  { month: "Mar", cost: 18400 },
  { month: "Apr", cost: 21200 },
  { month: "May", cost: 17600 },
  { month: "Jun", cost: 24800 },
  { month: "Jul", cost: 19900 },
  { month: "Aug", cost: maintenanceRequests.reduce((s, m) => s + m.cost, 0) },
];

export const leaseExpirationTrend = [
  { month: "Sep", count: leases.filter((l) => l.end.startsWith("2026-09")).length + 3 },
  { month: "Oct", count: leases.filter((l) => l.end.startsWith("2026-10")).length + 4 },
  { month: "Nov", count: leases.filter((l) => l.end.startsWith("2026-11")).length + 2 },
  { month: "Dec", count: leases.filter((l) => l.end.startsWith("2026-12")).length + 5 },
  { month: "Jan", count: leases.filter((l) => l.end.startsWith("2027-01")).length + 3 },
  { month: "Feb", count: leases.filter((l) => l.end.startsWith("2027-02")).length + 2 },
];

export const expensesByCategory = expenseCategories.map((category) => ({
  category,
  amount: expenses.filter((e) => e.category === category).reduce((s, e) => s + e.amount, 0),
}));

export const expensesByProperty = properties
  .map((p) => ({
    name: p.name.split(" ").slice(0, 2).join(" "),
    amount: expenses.filter((e) => e.propertyId === p.id).reduce((s, e) => s + e.amount, 0),
  }))
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 8);

export const monthlyExpensesTrend = [
  { month: "Jan", amount: Math.round(expenses.reduce((s, e) => s + e.amount, 0) / 8) },
  { month: "Feb", amount: Math.round(expenses.reduce((s, e) => s + e.amount, 0) / 7.4) },
  { month: "Mar", amount: Math.round(expenses.reduce((s, e) => s + e.amount, 0) / 7.9) },
  { month: "Apr", amount: Math.round(expenses.reduce((s, e) => s + e.amount, 0) / 8.3) },
  { month: "May", amount: Math.round(expenses.reduce((s, e) => s + e.amount, 0) / 7.6) },
  { month: "Jun", amount: Math.round(expenses.reduce((s, e) => s + e.amount, 0) / 8.1) },
  { month: "Jul", amount: Math.round(expenses.reduce((s, e) => s + e.amount, 0) / 7.7) },
  { month: "Aug", amount: Math.round(expenses.reduce((s, e) => s + e.amount, 0) / 8.2) },
];

export const rentCollection = {
  expected: monthlyRent,
  collected: Math.round(monthlyRent * 0.91),
  outstanding: outstandingRent,
  overdue: tenants.filter((t) => t.balance > 0).length,
  collectionRate: 91.4,
};

export const rentCollectionTrend = [
  { month: "Mar", collected: Math.round(monthlyRent * 0.88), expected: Math.round(monthlyRent * 0.9) },
  { month: "Apr", collected: Math.round(monthlyRent * 0.9), expected: Math.round(monthlyRent * 0.93) },
  { month: "May", collected: Math.round(monthlyRent * 0.93), expected: Math.round(monthlyRent * 0.96) },
  { month: "Jun", collected: Math.round(monthlyRent * 0.94), expected: Math.round(monthlyRent * 0.98) },
  { month: "Jul", collected: Math.round(monthlyRent * 0.95), expected: Math.round(monthlyRent * 0.99) },
  { month: "Aug", collected: rentCollection.collected, expected: rentCollection.expected },
];

export function getPropertyById(id: string) {
  return properties.find((p) => p.id === id);
}
export function getUnitsForProperty(id: string) {
  return units.filter((u) => u.propertyId === id);
}
export function getTenantsForProperty(id: string) {
  return tenants.filter((t) => t.propertyId === id);
}
export function getLeasesForProperty(id: string) {
  return leases.filter((l) => l.propertyId === id);
}
export function getMaintenanceForProperty(id: string) {
  return maintenanceRequests.filter((m) => m.propertyId === id);
}
export function getInspectionsForProperty(id: string) {
  return inspections.filter((i) => i.propertyId === id);
}
export function getExpensesForProperty(id: string) {
  return expenses.filter((e) => e.propertyId === id);
}
export function getDocumentsForProperty(id: string) {
  return documents.filter((d) => d.propertyId === id);
}
export function getTenantById(id: string) {
  return tenants.find((t) => t.id === id);
}
