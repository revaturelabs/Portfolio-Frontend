import React, { Component } from 'react';
import { Route } from 'react-router';
import AccountLogin from './AccountLogin';

class Layout extends Component {
    render() {
        return (
            <div>
                <Route path="/login" component={AccountLogin} />
            </div>
        );
    }
}

export default Layout;