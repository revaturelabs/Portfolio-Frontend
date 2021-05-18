import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Card, Button, Modal} from 'react-bootstrap';
import { QuestionCircle, PlusCircle, XCircle } from 'react-bootstrap-icons';
import { Tooltip } from 'reactstrap'
import '../css/OtherWorkExperience.css'

const OtherWorkExperience = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [employer, setEmployer] = useState("");
    const [title, setTitle] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [description, setDescription] = useState("");
    const [tools, setTools] = useState("");
    const [date, setDate] = useState("");    

    // Tooltip for add and details buttons
    //***********************************************************************/
    const [addTooltipOpen, setAddTooltipOpen] = useState(false)
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen)
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen)
    //***********************************************************************/

    // Card details Modal show and hide
    //****************************************************/
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails= () => setShowDetails(true);
    //***************************************************/

    // Get data from data base
    //***********************************************************/
    const getData = async () => {
        axios.get("http://3.236.213.150:8081/workhistory")
        .then(resp => {
            console.log(resp.data)
        })
        .catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {getData()}, [])
    //***********************************************************/

    // Save data to database
    //***************************************************/
    const handleSave = () => {
        axios.post("http://3.236.213.150:8081/workhistory", {
            employer,
            title,
            responsibilities,
            description,
            tools,
            date
        })
        .then(resp => {
            console.log(resp.data);
        })
        .catch(error => {
            console.log(error)
        })

        setEmployer("");
        setTitle("");
        setResponsibilities("");
        setDescription("");
        setTools("");
        setDate("");
        setShow(false);
    }
    //***************************************************/

    //***************************************************/
    const createWorkExperience = (data: any) => {
        
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



    return (
        <div className="container">

            <Card id="card-container">
                <Card.Header id="header-work-experience">
                    <h4>
                        Other Work Experience
                        <QuestionCircle id="card-info" onClick={handleShowDetails}/>
                        <PlusCircle id="add-work-experience" onClick={handleShow}/>
                        <Tooltip target="add-work-experience" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>
                <Card.Body id="card-body">
                    <Card.Text className="work-experience"></Card.Text>
                </Card.Body>
            </Card>



            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add Other Work Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSave}>
                        <h6>Employer Name</h6>
                        <input type="text" name="employer" className="form-input" onChange={e => setEmployer(e.target.value)}/>
                        <h6>Date</h6>
                        <input type="text" name="jobTitle" id="" className="form-input" placeholder="" onChange={ (e) => setDate(e.target.value)}/>
                        <h6>Job Title</h6>
                        <input type="text" name="title" id="" className="form-input" onChange={ (e)=> setTitle(e.target.value) }/>
                        <h6>Roles / Responsibilities</h6>
                        <textarea name="responsibilities" id="" className="form-input" placeholder="" onChange={ (e) => setResponsibilities(e.target.value)}/> 
                        <h6>Problem Description</h6> 
                        <textarea name="description" id="" className="form-input" placeholder="" onChange={ (e) => setDescription(e.target.value)}/>
                        <h6>Tools / Technologies</h6>
                        <textarea name="tools" id="" className="form-input" placeholder="" onChange={ (e) => setTools(e.target.value)}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" className="" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" className="" onClick={()=>{ handleSave();}}>Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header>
                    <Modal.Title>Details</Modal.Title>
                    <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                </Modal.Header>
                <Modal.Body>
                    <p>This section is used to mention your relevant work experience prior to Revature.
                        <br/>
                        <br/>
                        Please, ensure that your previous work experience relate to your curriculum at Revature.
                    </p>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default OtherWorkExperience
