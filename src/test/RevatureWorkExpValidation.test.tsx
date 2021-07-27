import { render } from "@testing-library/react";
import revWorkExpValidation from "../components/validation/RevatureWorkExpValidation";

test('ensure revWorkExpValidation returns false when passed falsey parameters', () => {
    let employer = "";
    let startDate = "";
    let endDate = "";
    let title = "";
    let responsibilities = "";
    let description = "";
    let technologies = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns true when passed all truthy parameters', () => {
    let employer = "Revature";
    let startDate = "05/16/2021";
    let endDate = "08/12/2021";
    let title = "Associate";
    let responsibilities = "Training";
    let description = "12 week training program with QC, audits, and projects";
    let technologies = "Frameworks";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(true);
});

test('ensure revWorkExpValidation returns false when employer is falsey', () => {
    let employer = "";
    let startDate = "05/16/2021";
    let endDate = "08/12/2021";
    let title = "Associate";
    let responsibilities = "Training";
    let description = "12 week training program with QC, audits, and projects";
    let technologies = "Frameworks";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when startDate is falsey', () => {
    let employer = "Revature";
    let startDate = "";
    let endDate = "08/12/2021";
    let title = "Associate";
    let responsibilities = "Training";
    let description = "12 week training program with QC, audits, and projects";
    let technologies = "Frameworks";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when endDate is falsey', () => {
    let employer = "Revature";
    let startDate = "05/16/2021";
    let endDate = "";
    let title = "Associate";
    let responsibilities = "Training";
    let description = "12 week training program with QC, audits, and projects";
    let technologies = "Frameworks";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when title is falsey', () => {
    let employer = "Revature";
    let startDate = "05/16/2021";
    let endDate = "08/12/2021";
    let title = "";
    let responsibilities = "Training";
    let description = "12 week training program with QC, audits, and projects";
    let technologies = "Frameworks";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when responsibilities is falsey', () => {
    let employer = "Revature";
    let startDate = "05/16/2021";
    let endDate = "08/12/2021";
    let title = "Associate";
    let responsibilities = "";
    let description = "12 week training program with QC, audits, and projects";
    let technologies = "Frameworks";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when description is falsey', () => {
    let employer = "Revature";
    let startDate = "05/16/2021";
    let endDate = "08/12/2021";
    let title = "Associate";
    let responsibilities = "Training";
    let description = "";
    let technologies = "Frameworks";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when technologies is falsey', () => {
    let employer = "Revature";
    let startDate = "05/16/2021";
    let endDate = "08/12/2021";
    let title = "Associate";
    let responsibilities = "Training";
    let description = "12 week training program with QC, audits, and projects";
    let technologies = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});