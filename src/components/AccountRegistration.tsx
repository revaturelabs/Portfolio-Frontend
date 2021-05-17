import 'bootstrap/dist/css/bootstrap.min.css';
import validate from './FormValidation';
import useForm from './ValidationHook';

const AccountRegistration = () => {

    const {inputs, handleInputChange, handleSubmit, errors} = useForm({firstName:'', lastName:'', email:'', password:'', confirmPassword: ''}, validate)

    const error: {[key: string]: any} = errors

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h6>First Name</h6>
                <input type="text" name="firstName" id="firstName" className="form-input" onChange={handleInputChange} value={inputs.firstName} />
                {error.firstName && <p>{error.firstName}</p>}
                <h6>Last Name</h6>
                <input type="text" name="lastName" id="lastName" className="form-input" onChange={handleInputChange} value={inputs.lastName} />
                {error.lastName && <p>{error.lastName}</p>}
                <h6>Email Address</h6>
                <input type="text" name="email" id="email" className="form-input" onChange={handleInputChange} value={inputs.email} />
                {error.email && <p>{error.email}</p>}
                <h6>Password</h6>
                <input type="password" name="password" id="passwrod" className="form-input" onChange={handleInputChange} value={inputs.password} />
                {error.password && <p>{error.password}</p>}
                <h6>Confirm Password</h6>
                <input type="password" name="confirmPassword" id="confirmPassword" className="form-input" onChange={handleInputChange} value={inputs.confirmPassword} />
                {error.confirmPassword && <p>{error.confirmPassword}</p>}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default AccountRegistration;