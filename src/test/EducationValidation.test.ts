import { render } from "@testing-library/react";
import educationValidation from "../components/validation/EducationValidation";

test('ensure educationValidation returns false when passed falsy parameters', () => {
    let university = "";
    let degree = "";
    let graduationDate = "";
    let gpa = 0.0;

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});

test('ensure educationValidation returns true when passed all truthy parameters', () => {
    let university = "Loyola University Maryland";
    let degree = "Computer Science";
    let graduationDate = "05/16/20";
    let gpa = 3.8;

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(true);
});

test('ensure educationValidation returns false when university is falsey', () => {
    let university = "";
    let degree = "Computer Science";
    let graduationDate = "05/16/20";
    let gpa = 3.8;

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});

test('ensure educationValidation returns false when degree is falsey', () => {
    let university = "Loyola University Maryland";
    let degree = "";
    let graduationDate = "05/16/20";
    let gpa = 3.8;

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});

test('ensure educationValidation returns false when graduationDate is falsey', () => {
    let university = "Loyola University Maryland";
    let degree = "Computer Science";
    let graduationDate = "";
    let gpa = 3.8;

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});

test('ensure educationValidation returns false when gpa is falsey', () => {
    let university = "Loyola University Maryland";
    let degree = "Computer Science";
    let graduationDate = "05/16/20";
    let gpa = 0.0;

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});