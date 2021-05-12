import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AccountLogin from './AccountLogin';
import HelloWorld from './HelloWorld';
import ProjectCard from './ProjectCard';
import RevatureWorkExperience from './RevatureWorkExperience';

class Layout extends Component {
    render() {
        return (
            <div>
                <RevatureWorkExperience />                
                <ProjectCard />                
                <Route path="/login" component={AccountLogin} />
            </div>
        );
    }
}

export default Layout;