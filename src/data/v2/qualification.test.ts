import { describe, expect, it } from "bun:test";
import { qualify } from "./qualification";
import type { QualifyInput } from "./qualification";

const PASS: QualifyInput = {
  role: "CTO",
  companyType: "B2B software vendor",
  arr: "$1M–$5M",
  aiStatus: "Prototype or pilot exists",
  timeline: "This month",
  context: "a".repeat(150),
};

describe("qualify", () => {
  it("returns qualified when all 6 checks pass", () => {
    const { tier, reason } = qualify(PASS);
    expect(tier).toBe("qualified");
    expect(reason).toBe("all checks passed");
  });

  it("returns borderline when 5/6 checks pass (fail role)", () => {
    const { tier } = qualify({ ...PASS, role: "Product leader" });
    expect(tier).toBe("borderline");
  });

  it("returns borderline when 5/6 checks pass (fail timeline)", () => {
    const { tier, reason } = qualify({ ...PASS, timeline: "Just exploring" });
    expect(tier).toBe("borderline");
    expect(reason).toContain("timeline:Just exploring");
  });

  it("returns borderline when 4/6 checks pass (fail role and timeline)", () => {
    const { tier } = qualify({
      ...PASS,
      role: "Other",
      timeline: "Just exploring",
    });
    expect(tier).toBe("borderline");
  });

  it("returns not_qualified when 3/6 checks pass", () => {
    const { tier } = qualify({
      ...PASS,
      role: "Other",
      timeline: "Just exploring",
      aiStatus: "Not sure",
    });
    expect(tier).toBe("not_qualified");
  });

  it("returns not_qualified when 0/6 checks pass", () => {
    const { tier, reason } = qualify({
      role: "Other",
      companyType: "Agency / consultancy",
      arr: "Under $1M",
      aiStatus: "Not sure",
      timeline: "Just exploring",
      context: "",
    });
    expect(tier).toBe("not_qualified");
    expect(reason).toContain("role:Other");
    expect(reason).toContain("companyType:Agency / consultancy");
    expect(reason).toContain("arr:Under $1M");
    expect(reason).toContain("aiStatus:Not sure");
    expect(reason).toContain("timeline:Just exploring");
    expect(reason).toContain("context:0chars");
  });

  describe("ARR — Prefer not to say rule", () => {
    it("passes arr when Prefer not to say + companyType is B2B software vendor", () => {
      const { tier } = qualify({ ...PASS, arr: "Prefer not to say" });
      expect(tier).toBe("qualified");
    });

    it("fails arr when Prefer not to say + companyType is not B2B software vendor", () => {
      const { tier, reason } = qualify({
        ...PASS,
        arr: "Prefer not to say",
        companyType: "Agency / consultancy",
      });
      expect(tier).toBe("borderline");
      expect(reason).toContain("arr:Prefer not to say");
      expect(reason).toContain("companyType:Agency / consultancy");
    });
  });

  describe("context length boundary", () => {
    it("fails context check at 149 chars", () => {
      const { tier, reason } = qualify({ ...PASS, context: "a".repeat(149) });
      expect(tier).toBe("borderline");
      expect(reason).toContain("context:149chars");
    });

    it("passes context check at exactly 150 chars", () => {
      const { tier } = qualify({ ...PASS, context: "a".repeat(150) });
      expect(tier).toBe("qualified");
    });
  });

  it("includes failing check labels in reason", () => {
    const { reason } = qualify({ ...PASS, role: "Product leader" });
    expect(reason).toContain("role:Product leader");
  });
});
