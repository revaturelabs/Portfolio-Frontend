import {useState} from 'react';

const useForm = (initialValues: any, validate: any) => {
    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})
    

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const validationErrors = validate(inputs)
        const noErros = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        if(noErros) {
            alert("Registered")
            window.location.reload()
        } else {
            console.log("Errors, please try again", validationErrors)
        }
    }

    const handleInputChange = (event: any) => {
        event.persist()
        setInputs((inputs: any) => ({...inputs, [event.target.name]: event.target.value}))
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors
    }

}

export default useForm;