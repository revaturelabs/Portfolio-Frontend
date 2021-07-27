import { render } from "@testing-library/react";
import certificationValidation from "../components/validation/CertificationValidation";

test('ensure certificationValidation returns false when passed falsy parameters', () => {
    let portfolio = "";
    let name = "";
    let certId = "";
    let issuedBy = "";
    let issuedOn = "";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns true when passed truthy parameters', () => {
    let portfolio = "true";
    let name = "true";
    let certId = "true";
    let issuedBy = "true";
    let issuedOn = "true";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(true);
});

test('ensure certificationValidation returns false when passed falsy portfolio', () => {
    let portfolio = "";
    let name = "true";
    let certId = "true";
    let issuedBy = "true";
    let issuedOn = "true";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns false when passed falsy name', () => {
    let portfolio = "true";
    let name = "";
    let certId = "true";
    let issuedBy = "true";
    let issuedOn = "true";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns false when passed falsy certId', () => {
    let portfolio = "true";
    let name = "true";
    let certId = "";
    let issuedBy = "true";
    let issuedOn = "true";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns false when passed falsy issuedBy', () => {
    let portfolio = "true";
    let name = "true";
    let certId = "true";
    let issuedBy = "";
    let issuedOn = "true";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns false when passed falsy issuedOn', () => {
    let portfolio = "true";
    let name = "true";
    let certId = "true";
    let issuedBy = "true";
    let issuedOn = "";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});
