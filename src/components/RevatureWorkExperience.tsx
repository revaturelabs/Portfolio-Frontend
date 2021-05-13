import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Card, Button, Modal, ModalBody } from 'react-bootstrap';
import { QuestionCircle, PlusCircle, XCircle } from 'react-bootstrap-icons'
import { Tooltip } from 'reactstrap';
import '../css/RevatureWorkExperience.css';


const RevatureWorkExperience = () => {
    // Add work experience Modal show and hide
    //*********************************************/
    const [showAddExperience, setShowExperience] = useState(false);
    const handleCloseAddExperience = () => setShowExperience(false);
    const handleShowAddExperience = () => setShowExperience(true);
    //***************************************************/

    // Card deatails Modal show and hide
    //*********************************************/
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails= () => setShowDetails(true);
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
        const months: Array<string> = [
            "January", "February", 
            "March", "April", "May", 
            "June", "July", "August",
            "September", "October", 
            "November", "December"
        ];
        let startDate = new Date(fromDate)
        let endDate = new Date(toDate)
        let duration = months[startDate.getMonth()] + " " + startDate.getFullYear() + " - " + months[endDate.getMonth()] + ' ' + endDate.getFullYear()

        let experienceDetails: Array<string> = [
            employerName,
            duration,
            jobTitle
        ]
        let workExperience = document.querySelector(".work-experience")
        let card = document.createElement("div")
        let cardHeader = document.createElement("div")
        let cardBody = document.createElement("div")
        let editDiv = document.createElement("div")
        let editButton = document.createElement("button")

        card.setAttribute("class", "card")
        cardHeader.setAttribute("class", "card-header")
        cardBody.setAttribute("class", "card-body")
        editButton.setAttribute("class", "btn btn-primary")

        card.appendChild(cardHeader)
        cardBody.innerHTML = "this will be the body of the card" // <--- this is temp
        card.appendChild(cardBody)

        editDiv.appendChild(editButton)
        editButton.style.float = "right"
        editButton.innerHTML = "Edit"
        cardHeader.appendChild(editDiv)

        let num: number = 1
        for (const iterator of experienceDetails) {
            let component = document.createElement("h" + num)

            cardHeader.appendChild(component)
            component.innerHTML = iterator
            if(num === 1) {
                component.style.fontWeight = "bold"
            } else if(num === 3) {
                component.style.color = "rgb( 242, 105, 3)"
            }
            num++
        }
        cardHeader.style.borderBottom = "5px solid rgb(115, 165, 194)"
        cardHeader.style.backgroundColor = "white"
        workExperience?.appendChild(card)  

        if(Number(workExperience?.childElementCount) > 1) {
            card.style.marginTop = "50px"
        }
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
        setShowExperience(false)
        console.log(exp)
    }
    //***************************************************/


    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header-work-experience">
                    <h4>
                        Work Experience
                        <QuestionCircle id="card-info" onClick={handleShowDetails}/>
                        <PlusCircle id="add-work-experience" onClick={handleShowAddExperience}/>
                        <Tooltip target="add-work-experience" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>
                <Card.Body id="card-body">
                    <Card.Text className="work-experience"></Card.Text>
                </Card.Body>
            </Card>
            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header>
                    <Modal.Title>Details</Modal.Title>
                    <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                </Modal.Header>
                <ModalBody>
                    <p>This section is used to mention your work experience with the Revature’s Client after placement. As of now, the Work Experiences section should be blank.
                        <br/>
                        <br/>
                        If you any previous work experience, you can mention them under the Other Experiences section.
                    </p>
                </ModalBody>
            </Modal>
            <Modal show={showAddExperience} onHide={handleCloseAddExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add Work Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post">
                            <h6>Employer Name</h6>
                            <input type="email" name="employerName" className="form-input" id="" onChange={e => setEmployerName(e.target.value)}/><br />
                            <h6>From</h6>
                            <input type="date" name="fromDate" className="form-input" id="" onChange={e => setFromDate(e.target.value)}/><br />
                            <h6>To</h6>
                            <input type="date" name="toDate" className="form-input" id="" onChange={e => setToDate(e.target.value)}/><br />
                            <h6>Job Title</h6>
                            <input type="text" name="jobTitle" className="form-input" id="" onChange={e => setJobTitle(e.target.value)}/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddExperience}>Close</Button>
                        <Button variant="primary" onClick={() => {handleSave(); createWorkExperience();}}>Save</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default RevatureWorkExperience
