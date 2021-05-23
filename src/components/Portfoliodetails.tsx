import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container ,Row ,Col, Button } from 'react-bootstrap'

import '../css/HonorAwards.css'


import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const Portfoliodetails = (props: any) => {

    const[portId, setPortId] = useState(0)
    const[portName, setPortName] = useState('')
    const[submitted , setSubmitted] = useState(false)
    const[approved, setApproved] = useState(false)
    const[reviewed, setReviewed]  = useState(false)
    const[feedback, setFeedback] = useState("")

    const { search } = useLocation()
    const { id } = queryString.parse(search)
    console.log("portfolio id=" + id)

    const getData = async() => {
        //http://3.236.213.150:8081/portfolios/6
        axios.get(`http://3.236.213.150:8081/portfolios/${id}`)
         .then(({data}) => {       
             console.log("getData()", data)
             setPortId(data.id)
             setPortName(data.name)
             setSubmitted(data.submitted)
             setApproved(data.approved)
             setReviewed(data.reviewed)
             setFeedback(data.feedback)
         })
    }

    useEffect(() => {getData()}, [portId])

    const onSubmit = (e:any) => {
        e.preventDefault()
        // this will be axios put to update portfolios back end
        axios({
            method: 'post',
            url: `http://3.236.213.150:8081/portfolios/${id}`,
            data: {
                id: portId,
                name: portName,
                submitted: submitted,
                approved: approved,
                reviewed: reviewed,
                feedback: feedback
            }
        })
        props.history.push('/admin')
    }

    return (
        <div>

        <h1>Approve/Reject/Review</h1>

            <form onSubmit = {onSubmit}>
                <Container>
                <Row>
                        <Col lg={2}>
                           Portfolios id:
                        </Col>
                        <Col lg={2}>
                            {portId} 
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            Potfolio name
                        </Col>
                        <Col lg={2}>
                            {portName}   
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            Review
                        </Col>
                        <Col lg={2}>
                            <input 
                                type="checkbox" 
                                name = "submitted" 
                                checked = {submitted} 
                                onChange={(e) => setSubmitted(e.target.checked)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            Approve
                        </Col>
                        <Col lg={2}>
                            <input 
                                type="checkbox" 
                                name = "approve" 
                                checked ={approved}  
                                onChange={e => setApproved(e.target.checked)}/>            
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            Reject
                        </Col>
                        <Col lg={2}>
                            <input 
                                type="checkbox" 
                                name = "Review"  
                                checked = {reviewed} 
                                onChange={e => setReviewed(e.target.checked)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div> Feedback</div>
                            <div> 

                                <textarea 
                                    name = "feedback"  
                                    cols={50} 
                                    rows={6} 
                                    value={feedback} 
                                    onChange={e=>setFeedback(e.target.value)} > 
                                </textarea>
                            </div>          
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div> 
                                <input type ="submit"  value ="submit" className="btn btn-success" />
                        </div>             
                        </Col>
                    </Row>
                </Container>
            </form>
        </div>
    )
}
 
export default Portfoliodetails
