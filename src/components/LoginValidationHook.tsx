import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


const useForm = (initialValues: any, loginValidate: any) => {
    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [cookies, setCookies] = useCookies(['user'])

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const validationErrors = loginValidate(inputs)
        const noErrors = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        console.log(inputs)
        if (noErrors) {
            let email = inputs.email
            let password = inputs.password
            axios.post('http://3.236.213.150:8081/users/login', null, { params: { email: { email }, password: { password } } })
                .then(response => {
                    if (response.data.admin !== true) {
                        setCookies('user', response.data, { path: '/' })
                        alert("Login was successful. Welcome " + cookies.fname + " " + cookies.lname)
                        window.location.pathname = "./list"
                    } else if (response.data.admin === true) {
                        alert("Admin login was successful. Welcome " + response.data.fname + " " + response.data.lname)
                        window.location.reload()
                    }
                })
                .catch(error => {
                    alert(error)
                })

        } else {
            console.log("Errors, please try again", validationErrors)
        }
    }

    const handleInputChange = (event: any) => {
        event.persist()
        setInputs((inputs: any) => ({ ...inputs, [event.target.name]: event.target.value }))
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors
    }

}

export default useForm;