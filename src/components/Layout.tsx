import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AccountLogin from "./AccountLogin";
import Project from "./Project";
import RevatureWorkExperience from "./RevatureWorkExperience";
import Landing from './Landing';
import ViewPortfolio from './ViewPortfolio';
import EditEmpPortfolio from './EditEmpPortfolio';

function Layout() {
    return (
          <div>
          <Route path="/login" exact component={AccountLogin} />
          <Route path="/projects" exact component={ProjectCard} />
          <Route path="/revature-work-experience" exact component={RevatureWorkExperience} />
          <Route path="/" exact component={Landing} />
          <Route path="/main" exact component={Landing} />
          <Route path="/portfolio" exact component={EditEmpPortfolio} />
          <Route path="/view" component={ViewPortfolio} />
        </div>
    );
}

export default Layout;
