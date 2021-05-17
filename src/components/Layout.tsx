import React from "react";
import { Route } from "react-router-dom";
import AccountLogin from "./AccountLogin";
import Project from "./Project";
import RevatureWorkExperience from "./RevatureWorkExperience";
import Landing from './Landing';
import ViewPortfolio from './ViewPortfolio';
import EditEmpPortfolio from './EditEmpPortfolio';
import AboutMe from "./AboutMe";
import OtherWorkExperience from "./OtherWorkExperience";
import Education from "./Education";
import PortfolioList from "./PortfolioList";
import HonorAward from "./HonorAward";
import IndustryEquivalency from './IndustryEquivalency';

function Layout() {
    return (
          <>
            <Route path="/login" component={AccountLogin} />
            <Route path="/projects" component={Project} />
            <Route path="/revature-work-experience" component={RevatureWorkExperience} />
            <Route exact path="/" component={Landing} />
            <Route path="/main" component={Landing} />
            <Route path="/portfolio" component={EditEmpPortfolio} />
            <Route path="/aboutMe" component={AboutMe} />
            <Route path="/view" component={ViewPortfolio} />
            <Route path="/other-work-experience" exact component={OtherWorkExperience} />
            <Route path="/education" component={Education} />
            <Route path="/list" component={PortfolioList} />
            <Route path="/honors" component={HonorAward} />
            <Route path="/equivalency" component={IndustryEquivalency} />
        </>
          
    );
}

export default Layout;
