import { render, screen } from '@testing-library/react';
import {aboutMeValidate} from '../components/AboutMe';
/**
 * Test file to test the proper functionality of the AboutMe validation
 * and page.
 * 
 * @author Kyle Castillo
 */

/**
 * Tests of the validation component within the AboutMe.tsx
 */
const validBio = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,"
const validEmail = "emailisValid@gmail.com";
const validPhone1 = "909-123-4567";
const validPhone2 = "9091234567";
const validPhone3 = "(909)-123-4567";
describe("Tests to ensure proper validation for the aboutMeValidate", () =>{
    it("Returns false if all values are falsey", () => {
        expect(aboutMeValidate("","","")).toBeFalsy();
    });
    it("Returns false if any of the values are falsey", () =>{
        expect(aboutMeValidate(validBio,"",validEmail)).toBeFalsy();
        expect(aboutMeValidate(validBio,validPhone1,"")).toBeFalsy();
        expect(aboutMeValidate("",validPhone1,validEmail)).toBeFalsy();
    });
    it("Returns false if the bio is not a certain length", () =>{
        expect(aboutMeValidate("bioTemp",validPhone1,validEmail)).toBeFalsy();
    });
    it("Returns false if the email is not valid", () => {
        expect(aboutMeValidate(validBio,validPhone1,"invalid")).toBeFalsy();
        expect(aboutMeValidate(validBio,validPhone1,"alsoinvalid.com")).toBeFalsy();
        expect(aboutMeValidate(validBio,validPhone1,"alsoinvalid@something")).toBeFalsy();
    });
    it("Returns false if the phone number is invalid", () => {
        expect(aboutMeValidate(validBio,"invalid",validEmail)).toBeFalsy();
        expect(aboutMeValidate(validBio,"909123456789A",validEmail)).toBeFalsy();
    });
    it("Returns true if all the inputs are valid", () => {
        expect(aboutMeValidate(validBio,validPhone1,validEmail)).toBe(true);
    });
    it("Returns true if the phone number is styled differently", () => {
        expect(aboutMeValidate(validBio,validPhone1,validEmail)).toBe(true);
        expect(aboutMeValidate(validBio,validPhone2,validEmail)).toBe(true);
        expect(aboutMeValidate(validBio,validPhone3,validEmail)).toBe(true);
    })
});