import React from "react";
import { Route } from "react-router-dom";
import AccountLogin from "./AccountLogin";
import Project from "./Project";
import RevatureWorkExperience from "./RevatureWorkExperience";
import Landing from './Landing';
import ViewPortfolio from './ViewPortfolio';
import EditEmpPortfolio from './EditEmpPortfolio';
import AboutMe from "./AboutMe";

function Layout() {
    return (
          <div>
          <Route path="/login" component={AccountLogin} />
          <Route path="/projects" component={Project} />
          <Route path="/revature-work-experience" component={RevatureWorkExperience} />
          <Route exact path="/" component={Landing} />
          <Route path="/main" component={Landing} />
          <Route path="/portfolio" component={EditEmpPortfolio} />
          <Route path="/aboutMe" component={AboutMe} />
          <Route path="/view" component={ViewPortfolio} />
        </div>
    );
}

export default Layout;
