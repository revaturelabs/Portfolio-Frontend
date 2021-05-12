import React, { Component } from 'react';
import { Route } from 'react-router';
import AccountLogin from './AccountLogin';
import EditEmpPortfolio from './EditEmpPortfolio';
import Landing from './Landing';

class Layout extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Landing} />
                <Route path="/main" component={Landing} />
                <Route path="/login" component={AccountLogin} />
                <Route path="/portfolio" component={EditEmpPortfolio} />
            </div>
        );
    }
}

export default Layout;