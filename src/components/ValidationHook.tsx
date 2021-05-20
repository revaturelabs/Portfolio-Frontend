import axios from 'axios';
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
            axios.post('http://3.236.213.150:8081/users', inputs)
            .then(response => {
                console.log(inputs)
                alert("Registered")
                window.location.reload()
            })
            .catch(error => {
                alert("Error " + error)
                console.log(error)
            })
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