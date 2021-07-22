import { render } from "@testing-library/react";
import industryValidation from "../components/validation/IndustryExperienceValidation";

test('ensure industryValidation returns false when passed falsy parameters', () => {
    let skillName = "";

    let valid = industryValidation(skillName);
    expect(valid).toBe(false);
});

test('ensure industryValidation returns true when passed truthy parameters', () => {
    let skillName = "Java";

    let valid = industryValidation(skillName);
    expect(valid).toBe(true);
});