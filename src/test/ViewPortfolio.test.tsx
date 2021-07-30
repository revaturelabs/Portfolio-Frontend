import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import 'axios';
import * as rcookies from 'react-cookie';

import {testPortfolioList, fullPortfolioTestObj, testAdminUser} from "./TestUserComponent";

// Import Portfolio component viewers
import AboutMeView from "../components/ViewPortfolio/AboutMeView";
// import CertificationView from "../components/ViewPortfolio/CertificationView";
// import EducationView from "../components/ViewPortfolio/EducationView";
// import HonorAwardView from "../components/ViewPortfolio/HonorAwardView";
// import IndustryEquivalencyView from '../components/ViewPortfolio/IndustryEquivalencyView';
// import OtherWorkExperienceView from "../components/ViewPortfolio/OtherWorkExperienceView";
// import ProjectView from "../components/ViewPortfolio/ProjectView";
// import RevatureWorkExperienceView from "../components/ViewPortfolio/RevatureWorkExperienceView";
// import ViewPortfolio from "../components/ViewPortfolio/ViewPortfolio";

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

})

afterEach(() => {
    jest.clearAllMocks();
})

afterAll(() => {
    jest.resetAllMocks();
})

// describe test AboutMeView
describe('Test AboutMe section on viewing portfolio', () => {
    

    test('Check if AboutMeView component is visible.', async () => {
        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.aboutMe});
        })
        
        const { getByText } = render(<AboutMeView />);
        const title = getByText("About Me");
                
        expect(await screen.findByText("About Me")).toBeVisible();

        // expect(<h4>About Me</h4>).toBeVisible();
        expect(title).toHaveTextContent("About Me");
        expect(title).not.toHaveTextContent("About You");

        await waitFor(() => {
            const bio = getByText(fullPortfolioTestObj.aboutMe.bio);
            expect(bio).toHaveTextContent(fullPortfolioTestObj.aboutMe.bio);
            expect(bio).not.toHaveTextContent("I Don't Have This Text");
        })

        await waitFor(() => {
            const email = getByText("Email: " + fullPortfolioTestObj.aboutMe.email);
            expect(email).toHaveTextContent("Email: " + fullPortfolioTestObj.aboutMe.email);
        })

        await waitFor(() => {
            const email = getByText("Phone: " + fullPortfolioTestObj.aboutMe.phone);
            expect(email).toHaveTextContent("Phone: " + fullPortfolioTestObj.aboutMe.phone);
        })
        
        
    })

})
