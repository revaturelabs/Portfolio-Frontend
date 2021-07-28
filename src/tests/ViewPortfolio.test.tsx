import { render } from "@testing-library/react";
import '@testing-library/jest-dom';

import axios from 'axios';

import {url} from "../api/api";
import {AdminUserTestComponent, PortfolioTestComponent, testPortfolioList, fullPortfolioTestObj} from "./TestUserComponent";

// Import Portfolio component viewers
import AboutMeView from "../components/ViewPortfolio/AboutMeView";
import CertificationView from "../components/ViewPortfolio/CertificationView";
import EducationView from "../components/ViewPortfolio/EducationView";
import HonorAwardView from "../components/ViewPortfolio/HonorAwardView";
import IndustryEquivalencyView from '../components/ViewPortfolio/IndustryEquivalencyView';
import OtherWorkExperienceView from "../components/ViewPortfolio/OtherWorkExperienceView";
import ProjectView from "../components/ViewPortfolio/ProjectView";
import RevatureWorkExperienceView from "../components/ViewPortfolio/RevatureWorkExperienceView";
import ViewPortfolio from "../components/ViewPortfolio/ViewPortfolio";

// amazing resource for understanding jest
// https://dev.to/zaklaughton/the-only-3-steps-you-need-to-mock-an-api-call-in-jest-39mb

const pIndex = 0; // select the index of the portfolio you want to view from testPortfolioList

beforeAll(async () => {
    <AdminUserTestComponent/>; // set user as admin in the cookie (necessary for axios rendered components)
    <PortfolioTestComponent portfolioIndex={pIndex}/>; // set the portfolio in the cookie
})

beforeEach(() => {

})

afterEach(() => {
    
})

afterAll(() => {
    jest.resetAllMocks();
})

// describe test AboutMeView
describe('Test AboutMe section on viewing portfolio', () => {
    
    const axios = require('axios');
    jest.mock('axios');

    axios.get.mockImplementation((urlLong: string) => {
        switch (urlLong) {
            // AboutMe axios call
            case (url + `/aboutMe/portfolio/${testPortfolioList[pIndex].id}`): 
                return Promise.resolve({data: fullPortfolioTestObj.aboutMe});
            // Certificates axios call
            case (url + `/certifications/portfolio/all/${testPortfolioList[pIndex].id}`):
                return Promise.resolve({data: fullPortfolioTestObj.certificates});
            // Education axios call
            case (url + `/education/portfolio/all/${testPortfolioList[pIndex].id}`):
                return Promise.resolve({data: fullPortfolioTestObj.education});
            // Honor awards axios call
            case (url + `/honor/portfolio/all/${testPortfolioList[pIndex].id}`):
                return Promise.resolve({data: fullPortfolioTestObj.honor});
            // Industry Equivalencies axios call
            case (url + `/equiv/portfolios/all/${testPortfolioList[pIndex].id}`):
                return Promise.resolve({data: fullPortfolioTestObj.equivalency});
            // Other Work Experience axios call
            case (url + '/workhistory'):
                return Promise.resolve({data: fullPortfolioTestObj.otherWorkExperience});
            // Projects axios call
            case (url + `/projects/portfolio/all/${testPortfolioList[pIndex].id}`):
                return Promise.resolve({data: fullPortfolioTestObj.projects});
            // Revature Work Experience axios call
            case (url + `${testPortfolioList[pIndex].id}`):
                return Promise.resolve({data: fullPortfolioTestObj.workExperience});
            default:
                break;
        }
    })

    test('Check if View Portfolio is being called', () => {

    })

    test('Check if AboutMeView component is visible.', () => {
        
        


    })

    // describe test CertificationView

    // describe test EducationView

    // describe test HonorAwardView

    // describe test IndustryEquivalencyView

    // describe test OtherWorkExperienceView

    // describe test ProjectView

    // describe test RevatureWorkExperienceView

    // describe test ViewPortfolio
})


// describe('Test Admin functionality on viewing Portfolio', () => {
    
//     const axios = require('axios');
//     jest.mock('axios');

//     test('Check if IndustryEquivalencyView component is visible.', () => {
        
//         render(<IndustryEquivalencyView />);
//         expect("Industry Equivalency").toBeVisible();

//     })
// })