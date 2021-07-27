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

// test('ensure editButton returns true when there are skills to be updated (passed truthy parameter)', () => {
//     let newSkill: [{
//         name: "test",

//     }]
        

//     let valid = industrySkillEditValidation(newSkill);
//     expect(valid).toBe(true);
// });

// test('ensure editButton returns false when there are skills to be updated (passed falsey parameter)', () => {
    
//     let skillSetNull = [{
//         id: 0,
//         header: "",
//     }]

//     let valid = industrySkillEditValidation(skillSetNull);
//     expect(valid).toBe(false);
// });
