//Imports
import { render } from "@testing-library/react";

//Project imports
import OtherWorkExpValidation from "../components/validation/OtherWorkExpValidation";

/*
    Perform the following tests to ensure project validation meets requirements

    - null employer triggers error
    - null descr triggers error
    - null rspbts triggers error
    - null tools triggers eror
    - null start date triggers eror
    - null end data triggers eror
    - End date before start date triggers error

    -p2
    - num projects must be 3, this must be tested elsewhere

*/

const w1 = {
    employer: "Company Inc",
    title: "My Other Work Experience",
    rspbts: "leader, coder, engineer",
    desc: "I did stuff and also things",
    tools: "C++, Java, Python, CSS, HTML, JavaScript",
    startDate: "1625374800000",
    endDate: "1626325200000"
}

//freeze const obj
Object.freeze(w1);

//Desribe full test suite for proj validation
describe('All Other Work Experience validation tests: ', function() {

    //null employer triggers error
    it('null employer triggers invalid submission', function() {
        const volObj = Object.create(w1);
        volObj.employer = null;
        expect(OtherWorkExpValidation(volObj)).toBe(false);
    });


    //null title triggers error
    it('null title triggers invalid submission', function() {
        const volObj = Object.create(w1);
        volObj.title = null;
        expect(OtherWorkExpValidation(volObj)).toBe(false);
    });


    //null responsibilities triggers error
    it('null responsibilities triggers invalid submission', function() {
        const volObj = Object.create(w1);
        volObj.rspbts = null;
        expect(OtherWorkExpValidation(volObj)).toBe(false);
    });


    //null description triggers error
    it('null description triggers invalid submission', function() {
        const volObj = Object.create(w1);
        volObj.desc = null;
        expect(OtherWorkExpValidation(volObj)).toBe(false);
    });


    //null tools triggers error
    it('null tools triggers invalid submission', function() {
        const volObj = Object.create(w1);
        volObj.tools = null;
        expect(OtherWorkExpValidation(volObj)).toBe(false);
    });


    //null startDate triggers error
    it('null startDate triggers invalid submission', function() {
        const volObj = Object.create(w1);
        volObj.startDate = null;
        expect(OtherWorkExpValidation(volObj)).toBe(false);
    });


    //null endDate triggers error
    it('null endDate triggers invalid submission', function() {
        const volObj = Object.create(w1);
        volObj.endDate = null;
        expect(OtherWorkExpValidation(volObj)).toBe(false);
    });


    //end date may not precede start date chronologically
    it('End date may not precede start date', function() {
        const volObj = Object.create(w1);
        volObj.endDate = "1625374700000";
        expect(OtherWorkExpValidation(volObj)).toBe(false);
    });


    //All fields populated correctly returns VALID response
    //null endDate triggers error
    it('All fields populated triggers valid response', function() {
        expect(OtherWorkExpValidation(w1)).toBe(true);
    });

});