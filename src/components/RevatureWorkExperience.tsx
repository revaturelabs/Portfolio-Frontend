import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { QuestionCircle, PlusCircle } from 'react-bootstrap-icons'
import { Tooltip } from 'reactstrap';
import '../css/RevatureWorkExperience.css';


const RevatureWorkExperience = () => {
    // Model show and hide
    //*********************************************/
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //***************************************************/

    // Tooltip for add and details buttons
    //***********************************************************************/
    const [addTooltipOpen, setAddTooltipOpen] = useState(false)
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen)
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen)
     //***********************************************************************/

    // Add work experience state handling
    //***************************************************/
    const [employerName, setEmployerName] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    //***************************************************/

    //Render work experience on page
    //*********************************************************************/
    const createWorkExperience = () => {
        let exp: Array<string> = [
            employerName,
            fromDate,
            toDate,
            jobTitle
        ]
        let workExperience = document.querySelector('.work-experience')
        let div = document.createElement('div')

        for (let index = 0; index < exp.length; index++) {
            let header = document.createElement('h1')
            div.appendChild(header)
            header.innerHTML = exp[index]
            workExperience?.appendChild(div)  
        }
        
        setEmployerName('');
        setFromDate('');
        setToDate('');
        setJobTitle('');

        div.style.border = "2px solid black"
    }
    //*********************************************************************/

    // Save data to database
    //***************************************************/
    const handleSave = () => {
        let exp: Array<string> = [
            employerName,
            fromDate,
            toDate,
            jobTitle
        ]
        setShow(false)
        console.log(exp)
    }
    //***************************************************/

    // Information meassage
    const message: string = "This section is used to mention your work experience with the Revature’s Client after placement. As of now, the Work Experiences section should be blank.\n\nIf you any previous work experience, you can mention them under the Other Experiences section."


    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>
                        Work Experience
                        <QuestionCircle id="card-info" onClick={() => (alert(message))} />
                        <PlusCircle id="add-experience" onClick={handleShow} />
                        <Tooltip target="add-experience" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>
                <Modal show={show} onHide={handleClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add Work Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post">
                            <h6>Employer Name</h6>
                            <input type="email" name="employerName" className="form-input" id="" onChange={e => setEmployerName(e.target.value)} /><br />
                            <h6>From</h6>
                            <input type="date" name="fromDate" className="form-input" id="" onChange={e => setFromDate(e.target.value)}/><br />
                            <h6>To</h6>
                            <input type="date" name="toDate" className="form-input" id="" onChange={e => setToDate(e.target.value)}/><br />
                            <h6>Job Title</h6>
                            <input type="text" name="jobTitle" className="form-input" id="" onChange={e => setJobTitle(e.target.value)}/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {handleSave(); createWorkExperience();}}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Card.Body>
                    <Card.Text className="work-experience"></Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RevatureWorkExperience
