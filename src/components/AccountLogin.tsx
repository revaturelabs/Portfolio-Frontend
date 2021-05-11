import React, { Component } from 'react';

class AccountLogin extends Component {
    render() {
        return (
            <div>
                <form>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="email" className="form-label">Email address:</label>
                        <input type="email" className="form-control" name="email" id="email" required/>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" name="password" id="password" required/>
                    </div>
                    <div className="mb-3 col-md-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AccountLogin;