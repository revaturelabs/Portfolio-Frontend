import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container , Table ,Row ,Col } from 'react-bootstrap'

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




const Portfoliodetails = () => {


    const[review , setReview] = useState(false)
    const[approve, setApprove] = useState(false)
    const[reject, setReject]  = useState(false)
    const[feedback, setFeedback] = useState("")


    const onSubmit = (e:any)=>{

        e.preventDefault()
        console.log ("button submit clicked" + review + approve + reject+ feedback)

        // this will be axios put 

    }


    return<div>

    


        <form onSubmit = {onSubmit}>

            <Container>

                <Row>

                    
                    <Col>
                        <div>
                            Potfolio name : name of the eportfolio

                        </div>
                    
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div> Review

                            <input type="checkbox" name = "review" checked = {review} onChange={(e)=>setReview(e.target.checked)} />

                       </div>

                                           
                    </Col>

                </Row>


                <Row>
                    <Col>
                        <div> Approve

                            <input type="checkbox" name = "approve" checked ={approve}  onChange={e=>setApprove(e.target.checked)}/>

                       </div>

                                           
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <div> Reject

                            <input type="checkbox" name = "reject"  checked = {reject} onChange={e=>setReject(e.target.checked)} />

                       </div>

                                           
                    </Col>

                </Row>


                <Row>
                    <Col>
                        <div> Feedback</div>

                        <div> 

                            <textarea name = "feedback"  cols={50} rows={6} value={feedback} onChange={e=>setFeedback(e.target.value)} > </textarea>

                       </div>

                                           
                    </Col>

                </Row>



                <Row>
                    <Col>

                        <div> 

                            <input type ="submit"  value ="submit"/>


                       </div>

                                           
                    </Col>

                </Row>


            </Container>

        </form>

        
    </div>

}
 
export default Portfoliodetails
