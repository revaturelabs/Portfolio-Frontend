import React, { Component } from 'react';
import { Route } from 'react-router';
import AccountLogin from './AccountLogin';
import HelloWorld from './HelloWorld';
import RevatureWorkExp from './RevatureWorkExperience';

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