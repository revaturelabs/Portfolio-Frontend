import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import axios from 'axios';
import * as rcookies from 'react-cookie';

import {url} from "../api/api";
import {testPortfolioList, fullPortfolioTestObj, testAdminUser} from "./TestUserComponent";

// Import Portfolio component viewers
import AboutMeView, {AboutMe} from "../components/ViewPortfolio/AboutMeView";
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
    
})

jest.mock('react-cookie', () => ({
    useCookies: jest.fn()
}));

jest.mock('axios');

beforeEach(() => {
    const getCookie = jest.spyOn(rcookies, 'useCookies').mockImplementation(() => {
        return [{
            id: 9999,
            admin: testAdminUser,
            portfolio: testPortfolioList[pIndex]
        }, function () {
            console.log('updateCookie function called.')
        }, function () {
            console.log('removeCookie function called.')
        }];
    })

    // mock axios
    
    // const axios = require('axios');
    // jest.mock('axios');
    // const useAxios = jest.spyOn(axios, 'get').mockImplementation((urlLong: string) => {
    //     switch (urlLong) {
    //         // AboutMe axios call
    //         case (url + `/aboutMe/portfolio/${testPortfolioList[pIndex].id}`): 
    //             return Promise.resolve({data: fullPortfolioTestObj.aboutMe});
    //         // Certificates axios call
    //         case (url + `/certifications/portfolio/all/${testPortfolioList[pIndex].id}`):
    //             return Promise.resolve({data: fullPortfolioTestObj.certificates});
    //         // Education axios call
    //         case (url + `/education/portfolio/all/${testPortfolioList[pIndex].id}`):
    //             return Promise.resolve({data: fullPortfolioTestObj.education});
    //         // Honor awards axios call
    //         case (url + `/honor/portfolio/all/${testPortfolioList[pIndex].id}`):
    //             return Promise.resolve({data: fullPortfolioTestObj.honor});
    //         // Industry Equivalencies axios call
    //         case (url + `/equiv/portfolios/all/${testPortfolioList[pIndex].id}`):
    //             return Promise.resolve({data: fullPortfolioTestObj.equivalency});
    //         // Other Work Experience axios call
    //         case (url + '/workhistory'):
    //             return Promise.resolve({data: fullPortfolioTestObj.otherWorkExperience});
    //         // Projects axios call
    //         case (url + `/projects/portfolio/all/${testPortfolioList[pIndex].id}`):
    //             return Promise.resolve({data: fullPortfolioTestObj.projects});
    //         // Revature Work Experience axios call
    //         case (url + `${testPortfolioList[pIndex].id}`):
    //             return Promise.resolve({data: fullPortfolioTestObj.workExperience});
    //         default:
    //             break;
    //     }
    // })

})

afterEach(() => {
    jest.clearAllMocks();
})

afterAll(() => {
    jest.resetAllMocks();
})

// describe test AboutMeView
describe('Test AboutMe section on viewing portfolio', () => {
    
   
    
    test('Check if View Portfolio is being called', () => {

    })

    test('Check if AboutMeView component is visible.', async () => {
        // axios.get.mockImplementationOnce(() => Promise.resolve({data: fullPortfolioTestObj.aboutMe}));
        const axios = require('axios');
        // const mockAboutMe: AboutMe = fullPortfolioTestObj.aboutMe;
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.aboutMe});
        })

        const { getByText } = render(<AboutMeView />);
        const title = getByText("About Me");
        const bio = getByText(fullPortfolioTestObj.aboutMe.bio);
        expect(await screen.findByText("About Me")).toBeVisible();

        // expect(<h4>About Me</h4>).toBeVisible();
        expect(title).toHaveTextContent("About Me");
        expect(title).not.toHaveTextContent("About You");

        expect(bio).toHaveTextContent(fullPortfolioTestObj.aboutMe.bio);

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