import React, { Component } from 'react';
import { Route } from 'react-router';
import AccountLogin from './AccountLogin';
import EditEmpPortfolio from './EditEmpPortfolio';
import Landing from './Landing';
import ViewPortfolio from './ViewPortfolio';

class Layout extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Landing} />
                <Route path="/main" component={Landing} />
                <Route path="/login" component={AccountLogin} />
                <Route path="/portfolio" component={EditEmpPortfolio} />
                <Route path="/view" component={ViewPortfolio} />
            </div>
        );
    }
}

export default Layout;