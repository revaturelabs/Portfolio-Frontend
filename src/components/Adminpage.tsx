import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container , Table ,Row ,Col} from 'react-bootstrap'
import '../css/HonorAwards.css'
import { render } from 'react-dom'
import {Link} from 'react-router-dom'

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

       const[portfolios,setPortfolios] = useState([])





    const renderportfolio = (p:any,index:number)=> {

        const portid = "/Portfoliodetails/"+p.id
        return (

            <tr>
                <td>{p.name}</td>
                <td>{p.submitted ? 'Submitted' : 'Pending'}</td>
                <td>{p.approved ? 'Approved': 'Rejected'}</td>
                <td>{p.reviewed ? 'Under Review' : 'Yet to be reviewd'}</td>
                <td>{p.feedback}</td>
                <td><Link to = {portid}>Edit </Link> </td>
                <td><Link to ="/view">View Portfolio</Link></td>

            </tr>



        )

    }

    const getData = async() => {
        axios.get("http://3.236.213.150:8081/portfolios")
         .then(response => {

            setPortfolios(response.data)
             
             console.log (response.data)
  

         })
    }

    useEffect(() => {getData()}, [])

    return <div> 

        <Container>  

        <Row>

        <Col lg={8}>
                <Table striped bordered hover  >

                    <thead>

                        <tr> 
                            <td> Protfolio name</td>

                            <td> Submitted/Pending  </td>

                            <td> Approved/Rejected </td>

                            <td> Review Status </td>

                            <td> Feedback </td>

                            <td>  Edit    </td>

                            <td>  View Portfolio </td>

  
                        </tr>
                        
                     </thead>


                     <tbody>

                        {
                        
                        portfolios.map(renderportfolio)
 
                        }


                     </tbody>



                </Table>
        
        
        </Col>


        </Row>


        </Container>




           </div>


}
 
export default Adminpage
