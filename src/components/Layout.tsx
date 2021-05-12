import React, { Component } from 'react';
import ProjectCard from './ProjectCard';
import { Route } from 'react-router';
import AccountLogin from './AccountLogin';
import RevatureWorkExp from './RevatureWorkExperience';
import HelloWorld from './HelloWorld';

class Layout extends Component {
    render() {
        return (
            <div>
                <HelloWorld />                
                <Route path="/login" component={AccountLogin} />
                <RevatureWorkExp />
            </div>
            
        );
    }
}

export default Layout;