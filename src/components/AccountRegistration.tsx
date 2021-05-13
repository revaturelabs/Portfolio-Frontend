import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AccountRegistration = () => {
    return (
        <div>
            <form>
                <h6>First Name</h6>
                <input type="text" name="firstName" id="firstName" className="form-input" />
                <h6>Last Name</h6>
                <input type="text" name="lastName" id="lastName" className="form-input" />
                <h6>Email Address</h6>
                <input type="email" name="email" id="email" className="form-input" />
                <h6>Password</h6>
                <input type="password" name="password" id="passwrod" className="form-input" />
                <h6>Confirm Password</h6>
                <input type="password" name="confirmPassword" id="confirmPassword" className="form-input" />
            </form>
        </div>
    );
};

export default AccountRegistration;