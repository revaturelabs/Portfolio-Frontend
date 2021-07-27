import { render } from "@testing-library/react";
import '@testing-library/jest-dom';

import {url} from "../api/api";

import {AdminUserTestComponent, GeneralUserTestComponent} from "../TestUserComponent";

import IndustryEquivalencyView from '../../components/ViewPortfolio/IndustryEquivalencyView';
import ViewPortfolio from "../../components/ViewPortfolio/ViewPortfolio";




beforeAll(async () => {
    <AdminUserTestComponent/>;
})


describe('Test Admin functionality on viewing Portfolio', () => {
    

    it('Check if IndustryEquivalencyView component is visible.', () => {
        

        render(<IndustryEquivalencyView />);
        expect("Industry Equivalency").toBeVisible();

    })
})