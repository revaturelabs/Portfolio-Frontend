import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, ModalBody } from 'react-bootstrap'
import { QuestionCircle, PlusCircle, XCircle } from 'react-bootstrap-icons'
import { Tooltip } from 'reactstrap'
import axios from 'axios'
import '../css/RevatureWorkExperience.css'


const RevatureWorkExperience = () => {
    // Add work experience Modal show and hide
    //*************************************************************/
    const [showAddExperience, setShowExperience] = useState(false)
    const handleCloseAddExperience = () => setShowExperience(false)
    const handleShowAddExperience = () => setShowExperience(true)
    //*************************************************************/

    // Card details Modal show and hide
    //****************************************************/
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails= () => setShowDetails(true);
    //***************************************************/

    // Update Modal show and hide
    //**************************************************************************/
    const[showUpdateExperience, setShowUpdateExperience] = useState(false)
    const handleCloseUpdateExperience = () => setShowUpdateExperience(false)
    const handleShowUpdateExperience = () => setShowUpdateExperience(true)
    //**************************************************************************/

    // Tooltip for add and details buttons
    //***********************************************************************/
    const [addTooltipOpen, setAddTooltipOpen] = useState(false)
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen)
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen)
     //***********************************************************************/

    // Add work experience state handling
    //***************************************************/
    const [employer, setEmployer] = useState('')
    const [title, setTitle] = useState('')
    const [responsibilities, setResponsibilities] = useState('')
    const [description, setDescription] = useState('')
    const [technologies, setTechnologies] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    //***************************************************/

    // Get data from data base
    //***********************************************************/
    const getData = async () => {
        axios.get("http://3.236.213.150:8081/workexperience")
        .then(resp => {
            console.log(resp.data)
            createWorkExperience(resp.data)
        })
        .catch(error => {
            console.log("error")
        })
    }
    useEffect(() => {getData()}, [])
    //***********************************************************/

    //Render work experience on page
    //*********************************************************************/
    const createWorkExperience = (data: any) => {
        const months: Array<string> = [
            "January", "February", 
            "March", "April", "May", 
            "June", "July", "August",
            "September", "October", 
            "November", "December"
        ];
        
        /*let sDate = new Date(startDate)
        let eDate = new Date(endDate)
        let duration = months[sDate.getMonth()] + " " + sDate.getFullYear() + " - " + months[eDate.getMonth()] + ' ' + eDate.getFullYear()*/



        let headerNum: number = 1
        for (let index = 0; index < data.length; index++) {
            let component = document.createElement("h1")
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
            editButton.addEventListener("click", () => {
            handleShowUpdateExperience()
            })
            cardHeader.appendChild(editDiv)

            cardHeader.appendChild(component)
            component.innerHTML = data[index].technologies

            if(headerNum === 1) {
                component.style.fontWeight = "bold"
            } else if(headerNum === 3) {
                component.style.color = "rgb( 242, 105, 3)"
            }

            cardHeader.style.borderBottom = "5px solid rgb(115, 165, 194)"
            cardHeader.style.backgroundColor = "white"
            workExperience?.appendChild(card) 

            if(Number(workExperience?.childElementCount) > 1) {
                card.style.marginTop = "50px"
            }

            headerNum++

        } 
    }
    //*********************************************************************/

    // Save data to database
    //***************************************************/
    const handleSave = () => {
        axios.post("http://3.236.213.150:8081/workexperience", {
            employer,
            startDate,
            endDate,
            title,
            description,
            responsibilities,
            technologies
        })
        .then(resp => {
            console.log("work Experience was saved successfully")
        })
        .catch(error => {
            console.log("error")
        })
        setEmployer('');
        setStartDate('');
        setEndDate('');
        setTitle('');
        setShowExperience(false)
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
                        <form onSubmit={handleSave}>
                            <h6>Employer Name</h6>
                            <input type="text" name="employer" className="form-input" onChange={e => setEmployer(e.target.value)}/>
                            <h6>From</h6>
                            <input type="date" name="startDate" className="form-input" onChange={e => setStartDate(e.target.value)}/>
                            <h6>To</h6>
                            <input type="date" name="endDate" className="form-input" onChange={e => setEndDate(e.target.value)}/>
                            <h6>Job Title</h6>
                            <input type="text" name="title" className="form-input" onChange={e => setTitle(e.target.value)}/>
                            <h6>Roles / Responsibilites</h6>
                            <textarea name="responsibilites" className="form-input work-experience-textarea" onChange={e => setResponsibilities(e.target.value)}></textarea>
                            <h6>Tools / Technologies</h6>
                            <textarea name="technologies" className="form-input work-experience-textarea" onChange={e => setTechnologies(e.target.value)}></textarea>
                            <h6>Problem Desciption</h6>
                            <textarea name="description" className="form-input work-experience-textarea" onChange={e => setDescription(e.target.value)}></textarea>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddExperience}>Close</Button>
                        <Button variant="primary" onClick={handleSave}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showUpdateExperience} onHide={handleCloseUpdateExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Edit Work Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <h6>Employer Name</h6>
                            <input type="text" name="employer" className="form-input" id="" onChange={e => setEmployer(e.target.value)}/>
                            <h6>From</h6>
                            <input type="date" name="startDate" className="form-input" id="" onChange={e => setStartDate(e.target.value)}/>
                            <h6>To</h6>
                            <input type="date" name="endDate" className="form-input" id="" onChange={e => setEndDate(e.target.value)}/>
                            <h6>Job Title</h6>
                            <input type="text" name="title" className="form-input" id="" onChange={e => setTitle(e.target.value)}/>
                            <h6>Roles / Responsibilites</h6>
                            <textarea name="responsibilites" className="form-input work-experience-textarea" id="" onChange={e => setResponsibilities(e.target.value)}></textarea>
                            <h6>Tools / Technologies</h6>
                            <textarea name="technologies" className="form-input work-experience-textarea" id="" onChange={e => setTechnologies(e.target.value)}></textarea>
                            <h6>Problem Desciption</h6>
                            <textarea name="description" className="form-input work-experience-textarea" id="" onChange={e => setDescription(e.target.value)}></textarea>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdateExperience}>Close</Button>
                        <Button variant="primary" onClick={() => {handleCloseUpdateExperience()}}>Update</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default RevatureWorkExperience
