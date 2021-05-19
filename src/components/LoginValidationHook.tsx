import axios from 'axios';
import { useState } from 'react';


const useForm = (initialValues: any, loginValidate: any) => {
    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const validationErrors = loginValidate(inputs)
        console.log(validationErrors)
        const noErrors = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        if (noErrors) {
            axios.get('http://3.236.213.150:8081/users/{inputs.email}')
            .then(response => {
                alert("Login was successful")
                window.location.pathname = "./list"
            })
            .catch(error => {
                alert('Error ' + error)
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