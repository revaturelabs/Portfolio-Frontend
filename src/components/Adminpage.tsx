import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container , Table , Row , Col} from 'react-bootstrap'
import '../css/HonorAwards.css'
import { render } from 'react-dom'
import {Link} from 'react-router-dom'

const Adminpage = () => {
    // state variable for all portfolios
    const[portfolios,setPortfolios] = useState([])


    // function to display all portfolios that store in state variable "portfolios"
    const renderportfolio = (p:any,index:number)=> {
        //create a query string for url
        const portid = "/Portfoliodetails?id=" + p.id
        //return jsx 
        return (
            <tr>
                <td>{p.name}</td>
                <td>{p.submitted ? 'Submitted' : 'Pending'}</td>
                <td>{p.approved ? 'Approved': 'Rejected'}</td>
                <td>{p.reviewed ? 'Review Completed' : 'Yet to be reviewed'}</td>
                <td>{p.feedback}</td>
                <td><Link to = {portid}>Edit </Link></td>
                <td><Link to ="/view">View Portfolio</Link></td>
            </tr>
        )
    }

    // function to fetch all portfolios from back end using axios
    

    const getData = async() => {
        axios.get("http://3.236.213.150:8081/portfolios")
         .then(response => {

            setPortfolios(response.data)
            console.log (response.data)
         })
    }

    // this will be call every time setState() is called
    useEffect(() => {getData()}, [])

    return (
        
        <div> 

            <h1>Portfolios</h1>
            <Container>  
                <Row>
                    <Col lg={8}>
                        <Table striped table-bordered hover  >
                            <thead>
                                <tr> 
                                    <th>ProtfolioName</th>
                                    <th>Submitted/Pending</th>
                                    <th>Approved/Rejected </th>
                                    <th>ReviewStatus </th>
                                    <th>Feedback</th>
                                    <th>Edit</th>
                                    <th>ViewPortfolio</th>
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
    )
}
 
export default Adminpage
