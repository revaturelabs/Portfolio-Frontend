import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AccountLogin from "./AccountLogin";
import ProjectCard from "./ProjectCard";
import RevatureWorkExperience from "./RevatureWorkExperience";

class Layout extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={AccountLogin} />
          <Route path="/projects" exact component={ProjectCard} />
          <Route path="/revature-work-experience" exact component={RevatureWorkExperience} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Layout;
