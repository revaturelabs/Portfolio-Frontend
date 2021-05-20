import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


const useForm = (initialValues: any, portfolioValidate: any) => {
    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [cookie, setCookie] = useCookies(['name'])

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const validationErrors = portfolioValidate(inputs)
        console.log(validationErrors)
        const noErrors = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        if (noErrors) {
            axios.post('http://3.236.213.150:8081/portfolios', inputs)
            .then(response => {
                alert("Portfolio Created")
                setCookie('name', inputs, {path: "/"})
                window.location.pathname = "./portfolio"
                return cookie
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