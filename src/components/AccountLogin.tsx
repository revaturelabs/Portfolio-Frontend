import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useForm from './LoginValidationHook';
import loginValidate from './LoginValidation';

const AccountLogin = () => {

    const {inputs, handleInputChange, handleSubmit, errors} = useForm({email:'', password:''}, loginValidate)

    const error: {[key: string]: any} = errors

    return (
        <div className="container mt-5">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 col-md-4">
                    <label htmlFor="email" className="form-label">Email address:</label>
                    <input type="text" className="form-control" name="email" id="email" onChange={handleInputChange} value={inputs.email} />
                    {error.email && <p style={{color:"red"}} >{error.email}</p>}
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={handleInputChange} value={inputs.password} />
                    {error.password && <p style={{color:"red"}}>{error.password}</p>}
                </div>
                <div className="mb-3 col-md-4">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

export default AccountLogin;
