import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AccountRegistration = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPasswrod] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const firstRender = useRef(true)
    const [disabled, setDisabled] = useState(true)

    const [firstNameError, setFirstNameError] = useState<null | String>(null)
    const [lastNameError, setLastNameError] = useState<null | String>(null)
    const [emailError, setEmailError] = useState<null | String>(null)
    const [passwordError, setPasswordError] = useState<null | String>(null)
    const [confrimPasswordError, setConfirmPasswordError] = useState<null | String>(null)

    useEffect(() => {

        if(firstRender.current) {
            firstRender.current = false
            return
        }

        setDisabled(firstNameValidation())
        setDisabled(lastNameValidation())
        setDisabled(emailValidation())
        setDisabled(passwordValidation())
        setDisabled(confirmPasswordValidation())

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstName, lastName, email, password, confirmPassword])

    const firstNameValidation = () => {

        if(firstName === "") {
            setFirstNameError('First Name cannot be blank!')
            return true
        } else {
            setFirstNameError(null)
            return false
        }
    }

    const lastNameValidation = () => {

        if(lastName === "") {
            setLastNameError('Last name Caoont be blank!')
            return true
        } else {
            setLastNameError(null)
            return false
        }
    }

    const emailValidation = () => {

        const atPosition = email.indexOf('@')
        const dotPosition = email.indexOf('.')

        if(atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length) {
            setEmailError('Please enter a valid email address')
            return true
        } else {
            setEmailError(null)
            return false
        }
    }

    const passwordValidation = () => {

        if(password.length < 8) {
            setPasswordError('Password must be at least 8 characters long')
            return true
        } else {
            setPasswordError(null)
            return false
        }

    }

    const confirmPasswordValidation = () => {

        if(confirmPassword !== password) {
            setConfirmPasswordError('passwords must match')
            return true 
        } else {
            setConfirmPasswordError(null)
            return false
        }

    }

    return (
        <div>
            <form>
                <h6>First Name</h6>
                <input type="text" name="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} id="firstName" className="form-input" />
                {firstNameError && <p>{firstNameError}</p>}
                <h6>Last Name</h6>
                <input type="text" name="lastName" value={lastName} onChange={event => setLastName(event.target.value)} id="lastName" className="form-input" />
                {lastNameError && <p>{lastNameError}</p>}
                <h6>Email Address</h6>
                <input type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} id="email" className="form-input" />
                {emailError && <p>{emailError}</p>}
                <h6>Password</h6>
                <input type="password" name="password" value={password} onChange={event => setPasswrod(event.target.value)} id="passwrod" className="form-input" />
                {passwordError && <p>{passwordError}</p>}
                <h6>Confirm Password</h6>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} id="confirmPassword" className="form-input" />
                {confrimPasswordError && <p>{confrimPasswordError}</p>}
                <button type="submit" className="btn btn-primary" disabled={disabled}>Register</button>
            </form>
        </div>
    );
};

export default AccountRegistration;