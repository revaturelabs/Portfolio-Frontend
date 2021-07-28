import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {url} from "../api/api";


const useForm = (initialValues: any, portfolioValidate: any) => {
    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [cookies, setCookies] = useCookies()

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const validationErrors = portfolioValidate(inputs)
        console.log(validationErrors)
        const noErrors = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        if (noErrors) {
            axios.post(url + '/portfolios', inputs, cookies['user'])
            .then(response => {
                alert("Portfolio Created")
                setCookies('portfolio', response.data, {path: "/"})

                window.location.pathname = "./portfolio"
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