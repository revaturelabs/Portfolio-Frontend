import { render } from "@testing-library/react";
import industrySkillNameValidation from "../components/validation/IndustryEquivalencyValidation";
import industrySkillEditValidation from "../components/validation/IndustryEquivalencyValidation";

test('ensure industrySkillNameValidation returns false when SkillName is passed with a falsy parameter', () => {
    let skillName = "";

    let valid = industrySkillNameValidation(skillName);
    expect(valid).toBe(false);
});

test('ensure industrySkillNameValidation returns true when SkillName is passed truthy parameter', () => {
    let skillName = "Java";

    let valid = industrySkillNameValidation(skillName);
    expect(valid).toBe(true);
});