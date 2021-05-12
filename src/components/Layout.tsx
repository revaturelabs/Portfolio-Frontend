import React, { Component } from 'react';
import ProjectCard from './ProjectCard';
import RevatureWorkExperience from './RevatureWorkExperience';

class Layout extends Component {
    render() {
        return (
            <div>
                <RevatureWorkExperience />                
                <ProjectCard />                
            </div>
            
        );
    }
}

export default Layout;