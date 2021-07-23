import { render } from "@testing-library/react";
import awardValidation from "../components/validation/AwardValidation";

test('ensure awardValidation returns false when passed falsy parameters', () => { 
    let id = "";
    let title = "";
    let description = "";
    let receivedFrom = "";
    let dateReceived = "";
    let portfolio = "";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns true when passed truthy parameters', () => { 
    let id = "true";
    let title = "true";
    let description = "true";
    let receivedFrom = "true";
    let dateReceived = "true";
    let portfolio = "true";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(true);
});

test('ensure awardValidation returns false when passed falsy id', () => { 
    let id = "";
    let title = "true";
    let description = "true";
    let receivedFrom = "true";
    let dateReceived = "true";
    let portfolio = "true";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy title', () => { 
    let id = "true";
    let title = "";
    let description = "true";
    let receivedFrom = "true";
    let dateReceived = "true";
    let portfolio = "true";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy description', () => { 
    let id = "true";
    let title = "true";
    let description = "";
    let receivedFrom = "true";
    let dateReceived = "true";
    let portfolio = "true";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy recievedFrom', () => { 
    let id = "true";
    let title = "true";
    let description = "true";
    let receivedFrom = "";
    let dateReceived = "true";
    let portfolio = "true";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy dateReceived', () => { 
    let id = "true";
    let title = "true";
    let description = "true";
    let receivedFrom = "true";
    let dateReceived = "";
    let portfolio = "true";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy portfolio', () => { 
    let id = "true";
    let title = "true";
    let description = "true";
    let receivedFrom = "true";
    let dateReceived = "true";
    let portfolio = "";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});