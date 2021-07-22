//Imports
import { render } from "@testing-library/react";

//Project imports
import projectValidation from "../components/validation/ProjectValidation";

/*
    Perform the following tests to ensure project validation meets requirements

    - null project name triggers error
    - null project descr triggers error
    - null git link triggers error
    - git link not public triggers eror

    -p2
    - num projects must be 3, this must be tested elsewhere

*/

//Desribe full test suite for proj validation
describe('All Project validation tests: ', function() {

/*  Create project Objects for testing  */
const p1 = {
    name: "JAN ORM",
    desc: "JAN Project",
    link: "https://github.com/jhw2167/JAN_ORM_p1"
}

//freeze const obj
Object.freeze(p1);

//null project name triggers invalid submission
it('null project name triggers invalid submission', function() {
    const vol = Object.create(p1);
    vol.name = null;
    expect(projectValidation(vol)).toBe(false);
});


//null project desc triggers invalid
it('null project name triggers invalid submission', function() {
    const vol = Object.create(p1);
    vol.desc = null;
    expect(projectValidation(vol)).toBe(false);
});


//null github link desc triggers invalid
it('null github link name triggers invalid submission', function() {
    const vol = Object.create(p1);
    vol.link = null;
    expect(projectValidation(vol)).toBe(false);
});


//All fields populated returns TRUE
it('All fields populated triggers valid response', function() {
    expect(projectValidation(p1)).toBe(true);
});


//Non-public github triggers invalid submission
it('Non-public github repo triggers invalid submission', function() {
    expect(projectValidation(p1)).toBe(false);
});

});