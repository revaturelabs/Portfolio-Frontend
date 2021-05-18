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
            alert("Login was successful")
            window.location.pathname = "./list"
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