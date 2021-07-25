import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, ModalBody} from 'react-bootstrap';
import { QuestionCircle, PlusCircle, XCircle } from 'react-bootstrap-icons';
import { Input, Tooltip } from 'reactstrap';
import '../css/RevatureAboutMe.css';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import {url} from "../api/api";
import {aboutMeValidateBio,aboutMeValidateEmail,aboutMeValidatePhone} from "./validation/ABoutMeValidation";
import {styleInvalidElementsByName, styleInvalidElement} from "./validation/InvalidFormHandling";


const RevatureAboutMe = () => {
    // Model show and hide
    //*********************************************/
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editShow, setEditShow] = useState(false);
    const handleEditShow = () => setEditShow(true);
    const handleEditClose = () => setEditShow(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const handleDeleteShow = () => setDeleteShow(true)
    const handleDeleteClose = () => setDeleteShow(false)
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
    const[editTooltipOpen, setEditToolTipOpen] = useState(false)
    const toggleEdit = () => setEditToolTipOpen(!editTooltipOpen)
    const [deleteToolTipOpen, setDeleteToolTipOpen] = useState(false)
    const toggleDelete = () => setDeleteToolTipOpen(!deleteToolTipOpen)
     //***********************************************************************/

    // Add about me state handling
    //***************************************************/
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [id, setID] = useState('')
    //***************************************************/

    //COOKIES!
    const [cookies, setCookies] = useCookies()
    //*************************************************** */

    //Render about me on page
    //*********************************************************************/
    const createAboutMe = (id: string, bio: string, email: string, phone: string) => {

        let aboutMe = document.querySelector('.about-me-content')
        let div = document.createElement('div')
        

            let rowDiv = document.createElement('div')
            let bioHeader = document.createElement('p')
            let emailHeader = document.createElement('h6')
            let phoneHeader = document.createElement('h6')
            let deleteButton = document.createElement('button')
            let editButton = document.createElement('button')
            
            setID(id)
            bioHeader.innerHTML = bio
            setBio(bio)
            emailHeader.innerHTML = "Email: " + email
            setEmail(email)
            phoneHeader.innerHTML = "Phone: " + phone
            setPhone(phone)
            
            bioHeader.style.whiteSpace = "pre-wrap"
            bioHeader.style.marginBottom = "50px"
            emailHeader.style.color = "grey"
            phoneHeader.style.color = "grey"

            emailHeader.setAttribute("class", "afterStyle")
            phoneHeader.setAttribute("class", "afterStyle")

            editButton.setAttribute("class", "btn btn-secondary")
            editButton.setAttribute("id", id)
            editButton.style.float = "right"
            editButton.style.marginRight = "10px"
            editButton.innerHTML = "Edit"

            deleteButton.setAttribute("class", "btn btn-danger")
            deleteButton.setAttribute("id", id)
            deleteButton.style.float = "right"
            deleteButton.style.marginRight = "10px"
            deleteButton.innerHTML = "Delete"

            editButton.addEventListener("click", () => {
                setID(id)
                setBio(bio)
                setEmail(email)
                setPhone(phone)
                handleEditShow()
            })

            deleteButton.addEventListener("click", () => {
                setID(id)
                handleDeleteShow()

            })

            rowDiv.appendChild(deleteButton)
            rowDiv.appendChild(editButton)
         
            div.setAttribute("class", "card")
            div.style.border = "none"

            rowDiv.appendChild(bioHeader)
            div.appendChild(rowDiv)
            div.appendChild(emailHeader)
            div.appendChild(phoneHeader)

            aboutMe?.appendChild(div) 

        
        div.style.padding = "5px"
        // div.style.border = "2px solid black"
        div.style.marginBottom = "10px"
    }

    // POST METHOD FOR CREATING

    const handleSave = async () => {
        let portfolio = cookies['portfolio']

        //Checking to see which parts of the about me information is valid.
        const isBioValid = aboutMeValidateBio(bio);
        const isEmailValid = aboutMeValidateEmail(email);
        const isPhoneValid = aboutMeValidatePhone(phone);

        //If the information provided is valid then update update.
        if(isBioValid && isEmailValid && isPhoneValid){
        axios.post(url + "/aboutMe", { portfolio, bio, email, phone})
        .then(response => {
            console.log("success") 
            console.log(response.data)
            window.location.reload()
        })
        .catch(error => {
            console.log("error")
        })
        setShow(false)
        setEditShow(false)

        //If any of the following was false check and return which part was invalid.
        } else {
            if(!isBioValid){
                let bioElement = document.getElementsByName("bioName");
                styleInvalidElementsByName(bioElement);
            }

            if(!isEmailValid){
                let emailElement = document.getElementsByName("fromDate");
                styleInvalidElementsByName(emailElement);
            }

            if(!isPhoneValid){
                let phoneElement = document.getElementsByName("toDate");
                styleInvalidElementsByName(phoneElement);
            }
        }
    }


    //POST METHOD FOR UPDATING

    const handleUpdate = async (id: string) => {

        //Checking to see which parts of the about me information is valid.
        const isBioValid = aboutMeValidateBio(bio);
        const isEmailValid = aboutMeValidateEmail(email);
        const isPhoneValid = aboutMeValidatePhone(phone);

        //If the information provided is valid then update update.
        if(isBioValid && isEmailValid && isPhoneValid){
        axios.post(url + "/aboutMe/" + id, {id, bio, email, phone})
        .then(response => {
            console.log("success")
            console.log(response.data)
            window.location.reload()
        })
        .catch(error => {
            console.log("error")
        })
        setShow(false)
        setEditShow(false)

        //If any of the following was false check and return which part was invalid.
        } else {
            if(!isBioValid){
                let bioElement = document.getElementsByName("bioName");
                styleInvalidElementsByName(bioElement);
            } else {

            }

            if(!isEmailValid){
                let emailElement = document.getElementsByName("fromDate");
                styleInvalidElementsByName(emailElement);
            }

            if(!isPhoneValid){
                let phoneElement = document.getElementsByName("toDate");
                styleInvalidElementsByName(phoneElement);
            }
        }
    } 


    //GET METHOD

    const handleGet = async () => {
        axios.get(url + "/aboutMe/portfolio/" + cookies['portfolio'].id)
        .then(response => {
            console.log("got the data")
            console.log(response.data)
                if(response.data.bio != undefined){
                    let kd = document.querySelector('#add-aboutMe')
                    kd?.setAttribute("class", "hide") 
                    createAboutMe(response.data.id, response.data.bio, response.data.email, response.data.phone)
                }

        })
        .catch(error => {
            console.log("failure")
        })
    }

    useEffect(()=> {handleGet()},[]);

    // DELTE METHOD


    const handleDelete = (id: any) => {
        console.log("this is the id " + id)
        axios.delete(url + "/aboutMe/" + id)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(error => {
            console.log("delete failure")
        })
        setDeleteShow(false)
    }
    
    // Information meassage
    const editMessage: string = "this is the edit bio button"
    let rowLength = 10
    let columnLength = 47

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>
                        About Me
                        <QuestionCircle id="card-info" onClick={handleShowDetails} />
                        <PlusCircle id="add-aboutMe" onClick={handleShow} />
                        <Tooltip target="add-aboutMe" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>

                {/* modal for add */}

                <Modal show={show} onHide={handleClose} backdrop="static" className="myModal">
                    <Modal.Header>
                        <Modal.Title>About Me</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalBody">
                        <form method="post">
                            <h6>Bio</h6>
                            <textarea className="form-textarea" name="bioName" rows={rowLength} onChange={e => setBio(e.target.value)}></textarea>
                            <h6>Email</h6>
                            <input type="email" name="fromDate" className="form-input" id="" onChange={e => setEmail(e.target.value)}/><br />
                            <h6>Phone #</h6>
                            <input type="text" name="toDate" className="form-input" id="" onChange={e => setPhone(e.target.value)}/><br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" className="oButton" onClick={() => {handleSave();}}>Add</Button>
                    </Modal.Footer>
               
                </Modal>
                <Card.Body>
                    <Card.Text>
                        
                        <span className="about-me-content"></span>

                        {/* Modal for Edit */}

                        <Modal show={editShow} onHide={handleEditClose} backdrop="static">
                            <Modal.Header>
                                <Modal.Title>About Me</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form method="post">
                                    <h6>Bio</h6>
                                    <textarea className="form-textarea" name="bioName" rows={rowLength} value={bio} onChange={e => setBio(e.target.value)}></textarea>
                                    <h6>Email</h6>
                                    <input type="email" name="fromDate" className="form-input" id="" value={email} onChange={e => setEmail(e.target.value)}/><br />
                                    <h6>Phone #</h6>
                                    <input type="tel" name="toDate" className="form-input" id="" value={phone} onChange={e => setPhone(e.target.value)}/><br />
                                </form>
                            </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleEditClose}>
                                        Close
                                    </Button>
                                    <Button className="oButton" onClick={() => {handleUpdate(id);}}>Update</Button>
                                </Modal.Footer>
                        </Modal>

                        {/* modal for delete */}

                        <Modal show={deleteShow} onHide={handleDeleteClose} backdrop="static">
                            <Modal.Header>
                                <Modal.Title>Delete Warning</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <h3>This will permanantly delete this info. Are you Sure?</h3>
                            </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={() => {handleDelete(id);}}>Yes, Permanantly Delete</Button>

                                    <Button variant="secondary" onClick={handleDeleteClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                        </Modal>
                        <Modal show={showDetails} onHide={handleCloseDetails}>
                    <Modal.Header>
                        <Modal.Title>Details</Modal.Title>
                        <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                    </Modal.Header>
                    <ModalBody>
                        <p>
                            This section is used to focus on your personal story and career goals.
                            <br/>
                            <br/>
                            Focus on your personal story and educational background information, 
                            career goals, relevant work experience, professional experience and skills, 
                            and a summary of your Revature experience.
                            <br/>
                            <br/>
                            Include your leadership qualities, problem-solving capabilities, 
                            presentation skills, communication skills, and teamplayer skills.
                            <br/>
                            <br/>
                            Don’t mention your hobbies or other non-relevant information.
                        </p>
                    </ModalBody>
                </Modal>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default RevatureAboutMe
