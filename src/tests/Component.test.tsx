

import validate from "../components/FormValidation";


beforeAll(async () => {
    const axios = require('axios');
})

beforeEach(() => {

})

afterEach(() => {
    jest.resetAllMocks();
})

afterAll(() => {
    
})

//test LoginValidation


//test form validation
describe('Test form validation', () => {
    it('makes sure first name cannot be blank', () => {
        const test = {fname:'First Name cannot be left blank'}

        expect(validate({fname:"", lname:'lastName', email:'test@mail.com', password:'password', confirmPassword:'password'})).toEqual(test);
    })
    it('check last name validation', () => {
        const test = {lname:'Last Name connot be left blank'}

        expect(validate({fname:"firstName", lname:'', email:'test@mail.com', password:'password', confirmPassword:'password'})).toEqual(test);
    })
    it('check email not blank', () => {
        const test = {email:'Email connot be left blank'}

        expect(validate({fname:"FirstName", lname:'lastName', email:'', password:'password', confirmPassword:'password'})).toEqual(test);
    })
    it('check email is valid', () => {
        const test = {email:'Please enter a vailed email address'}

        expect(validate({fname:"firstname", lname:'lastName', email:'testmailcom', password:'password', confirmPassword:'password'})).toEqual(test);
    })
    it('check password not blank', () => {
        const test = {password:'Password cannot be left blank'}

        expect(validate({fname:"firstname", lname:'lastName', email:'test@mail.com', password:'', confirmPassword:'password'})).toEqual(test);
    })
    it('check password length', () => {
        const test = {password:'Password must be at least 8 characters long'}

        expect(validate({fname:"FirstName", lname:'lastName', email:'test@mail.com', password:'pass', confirmPassword:'password'})).toEqual(test);
    })
    it('check password confirmation', () => {
        const test = {confirmPassword:'Passwords must match'}

        expect(validate({fname:"firstname", lname:'lastName', email:'test@mail.com', password:'password', confirmPassword:'pword'})).toEqual(test);
    })
    
})


