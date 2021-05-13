import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AccountLogin from "./AccountLogin";
import ProjectCard from "./ProjectCard";
import RevatureWorkExperience from "./RevatureWorkExperience";
import Landing from './Landing';
import EditEmpPortfolio from './EditEmpPortfolio';
import AboutMe from "./AboutMe";

function Layout() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={AccountLogin} />
          <Route path="/projects" exact component={ProjectCard} />
          <Route path="/revature-work-experience" exact component={RevatureWorkExperience} />
          <Route path="/" exact component={Landing} />
          <Route path="/main" exact component={Landing} />
          <Route path="/portfolio" exact component={EditEmpPortfolio} />
          <Route path="/aboutMe" exact component={AboutMe} />
        </Switch>
      </BrowserRouter>
    );
}

export default Layout;
