import { render } from "@testing-library/react";
import industrySkillValidation from "../components/validation/IndustryEquivalencyValidation";


test('ensure industrySkillNameValidation returns false when SkillName is passed with a falsy parameter', () => {
    let skillName = "";
    let equivalency = 0;

    let valid = industrySkillValidation(skillName, equivalency);
    expect(valid).toBe(false);
});

test('ensure industrySkillValidation returns true when SkillName is passed truthy parameter', () => {
    let skillName = "Java";
    let equivalency = 3;

    let valid = industrySkillValidation(skillName, equivalency);
    expect(valid).toBe(true);
});