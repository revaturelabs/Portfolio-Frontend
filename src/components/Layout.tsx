import React, { Component } from 'react';
import { Route } from 'react-router';
import AccountLogin from './AccountLogin';
import RevatureWorkExp from './RevatureWorkExperience';
import SkillMatrix from './SkillMatrix';

class Layout extends Component {
    render() {
        return (
            <div>
                <Route path="/login" component={AccountLogin} />
                <RevatureWorkExp />
                <SkillMatrix />
            </div>
        );
    }
}

export default Layout;