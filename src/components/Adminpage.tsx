import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/HonorAwards.css'

const portfoliolist = [

    {id: 0, name: "portfoliosam", 
    
    user: {fname:"sam",lname:"g"},
    
    submitted: false,
    approved: false, 
    reviewed: false,
    feedback: "testing"},

    {id: 1, name: "portfoliojim", 
    
    user: {fname:"jimm",lname:"g"},
    
    submitted: false,
    approved: false, 
    reviewed: false,
    feedback: "testing"}



]

const Adminpage = () => {

    const[state,setState] = useState('')

    const getData = async() => {
        axios.get("http://3.236.213.150:8081/portfolios")
         .then(response => {
             setState("HelloWorld")
             console.log (response.data)
  

         })
    }

    useEffect(() => {getData()}, [])

    return <div> 


    { portfoliolist.map(p => (
         <li>
                {p.name }
        </li>

    )) 



    }


    </div>


}
 
export default Adminpage
