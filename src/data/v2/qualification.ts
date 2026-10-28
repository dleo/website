export const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "protonmail.com",
  "aol.com",
  "live.com",
  "yandex.com",
  "gmx.com",
];

export const emailDomain = (email: string): string => {
  const at = email.lastIndexOf("@");
  return at === -1
    ? ""
    : email
        .slice(at + 1)
        .toLowerCase()
        .trim();
};

export const isFreeEmail = (email: string): boolean =>
  FREE_EMAIL_DOMAINS.includes(emailDomain(email));

export const looksLikeUrl = (s: string): boolean => {
  const v = s.trim();
  if (!v) return false;
  return /\.[a-z]{2,}/i.test(v);
};

export const ROLE_VALUES = [
  "CTO",
  "VP Engineering",
  "Head of Engineering",
  "Founder / CEO",
  "Product leader",
  "Other",
] as const;
export type Role = (typeof ROLE_VALUES)[number];

export const COMPANY_TYPE_VALUES = [
  "B2B software vendor",
  "Internal tools / IT team",
  "Agency / consultancy",
  "Other",
] as const;
export type CompanyType = (typeof COMPANY_TYPE_VALUES)[number];

export const ARR_VALUES = [
  "Under $1M",
  "$1M–$5M",
  "$5M–$30M",
  "$30M+",
  "Prefer not to say",
] as const;
export type Arr = (typeof ARR_VALUES)[number];

export const AI_STATUS_VALUES = [
  "Customers asking, nothing built",
  "Prototype or pilot exists",
  "AI feature live with problems",
  "Not sure",
] as const;
export type AiStatus = (typeof AI_STATUS_VALUES)[number];

export const TIMELINE_VALUES = [
  "This month",
  "This quarter",
  "Just exploring",
] as const;
export type Timeline = (typeof TIMELINE_VALUES)[number];

export type Tier = "qualified" | "borderline" | "not_qualified";

export type QualifyInput = {
  role: string;
  companyType: string;
  arr: string;
  aiStatus: string;
  timeline: string;
  context: string;
};

const QUALIFIED_ROLES: string[] = [
  "CTO",
  "VP Engineering",
  "Head of Engineering",
  "Founder / CEO",
];

const QUALIFIED_ARR_VALUES: string[] = ["$1M–$5M", "$5M–$30M", "$30M+"];

export const qualify = (
  input: QualifyInput,
): { tier: Tier; reason: string } => {
  const arrPasses =
    QUALIFIED_ARR_VALUES.includes(input.arr) ||
    (input.arr === "Prefer not to say" &&
      input.companyType === "B2B software vendor");

  const checks = {
    role: QUALIFIED_ROLES.includes(input.role),
    companyType: input.companyType === "B2B software vendor",
    arr: arrPasses,
    aiStatus: input.aiStatus !== "Not sure",
    timeline: input.timeline !== "Just exploring",
    context: input.context.trim().length >= 150,
  };

  const passing = Object.values(checks).filter(Boolean).length;
  const fails: string[] = [];
  if (!checks.role) fails.push(`role:${input.role || "none"}`);
  if (!checks.companyType)
    fails.push(`companyType:${input.companyType || "none"}`);
  if (!checks.arr) fails.push(`arr:${input.arr || "none"}`);
  if (!checks.aiStatus) fails.push(`aiStatus:${input.aiStatus || "none"}`);
  if (!checks.timeline) fails.push(`timeline:${input.timeline || "none"}`);
  if (!checks.context)
    fails.push(`context:${input.context.trim().length}chars`);

  const reason = fails.length ? fails.join(", ") : "all checks passed";
  let tier: Tier;
  if (passing === 6) tier = "qualified";
  else if (passing >= 4) tier = "borderline";
  else tier = "not_qualified";
  return { tier, reason };
};
