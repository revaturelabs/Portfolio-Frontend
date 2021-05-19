import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, ModalBody } from 'react-bootstrap'
import { QuestionCircle, PlusCircle, XCircle } from 'react-bootstrap-icons'
import { Tooltip } from 'reactstrap'
import axios from 'axios'
import '../css/HonorAwards.css'


const HonorAwards = () => {
    // Add  Modal show and hide
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
    // Add honor awards  state handling
    //***************************************************/
    const [title, setAwardTitle] = useState('')
    const [description, setDesc] = useState('')
    const [receivedFrom, setRecefrom] = useState('')
    const [dateReceived, setReceon] = useState('')
    const [id, setId] = useState('')

    //***************************************************/
    // Get data from data base
    //***********************************************************/
     const getData = async() => {
        axios.get("http://3.236.213.150:8081/honor")
         .then(response => {
             createHonorAward(response.data)
  

         })
    }
     useEffect(() => {getData()}, [])
     
    //*********************************************************************/
    //Render honor awards on page
    //*********************************************************************/
    const createHonorAward = (data:any) => {  
        
        for (let index = 0; index < data.length; index++) {
        let titlec = document.createElement("h5")
        let descc = document.createElement("p")
        let recefromc = document.createElement("h5")
        let recefromt = document.createElement("p")
        let receonc = document.createElement("h5")
        let honoraward = document.querySelector(".honoraward")
        let card = document.createElement("div")
        let cardBody = document.createElement("div")
        let cardFooter =document.createElement("div")
        let editDiv = document.createElement("div")
        let editButton = document.createElement("button")
        let deleteButton = document.createElement("button")

        card.setAttribute("class", "card")
        cardBody.setAttribute("class", "card-body")
        cardFooter.setAttribute("class", "card-footer")

        editButton.setAttribute("class", "btn btn-primary")
        deleteButton.setAttribute("class", "btn btn-danger")

        card.setAttribute("id", data[index].id)



        card.appendChild(cardBody)
        card.appendChild(cardFooter)
        cardFooter.appendChild(editDiv)

        editDiv.appendChild(editButton)
        editDiv.appendChild(deleteButton)
        deleteButton.innerHTML = "Delete"
        deleteButton.style.float = "right"
        deleteButton.style.marginRight ="10px"
        deleteButton.addEventListener("click", () => {
            setId(data[index].id)
            handleDelete(card)
        })
   
        editButton.style.float = "right"
        editButton.innerHTML = "Edit"
        editButton.style.marginRight = "10px"

        editButton.addEventListener("click", () => {
            setAwardTitle(data[index].title)
            setDesc(data[index].description)
            setRecefrom(data[index].receivedFrom)
            setReceon(data[index].dateReceived)
            setId(data[index].id)
            handleShowUpdateExperience()
        })


        titlec.innerHTML = data[index].title
        cardBody.appendChild(titlec)
        descc.innerHTML = data[index].description
        cardBody.appendChild(descc)
        descc.style.whiteSpace = "pre-wrap"
        descc.style.marginBottom = "50px"
        
        
        recefromt.innerText ="Recived From  :  " 
        recefromc.innerHTML ="Received From :  "  + data[index].receivedFrom
        console.log("tesingrece"+ data[index].receivedFrom )
        cardBody.appendChild( recefromc)
        receonc.innerHTML ="Received On :   "  + data[index].dateReceived
        cardBody.appendChild(receonc)
        recefromc.style.color = "grey"
        receonc.style.color = "grey"

         
         honoraward?.appendChild(card) 
         if(Number(honoraward?.childElementCount) > 1) {
             card.style.marginTop = "50px"
         }


    } 
}

    //*********************************************************************/
    // Save data to database
    //*********************************************************************/


    const handleSave = () => {
        console.log("awardtitle" + title);

        axios.post("http://3.236.213.150:8081/honor", {
            title,
            description,
            receivedFrom,
            dateReceived
 
        })
        .then(resp => {
            console.log(resp.data);
            console.log("honorawards saved succesfully")
            window.location.reload()

        })
        .catch(error => {
            console.log("error")
        })
        setAwardTitle('');
        setDesc('');
        setRecefrom('');
        setReceon('');
        setShowExperience(false)
    }
    //***********************************************************************/
    // Update honor/award from database
    //***********************************************************************/
    const handleUpdate = (input: any) => {
        axios.put("http://3.236.213.150:8081/honor",{
        id,
        title,
        description,
        receivedFrom,
        dateReceived

    })
        .then(resp => {
            console.log("honor updates");
            window.location.reload()
        })
        .catch(error => {
            console.log("error")
        })
    }
    //*******************************************************************************************/
    // Delete honor/award from database
    //*******************************************************************************************/
    const handleDelete = (input: any) => {
        axios.delete("http://3.236.213.150:8081/honor/" + input.getAttribute("id"))
        .then(resp => {
            console.log("Delete was successful");
            window.location.reload()
        })
        .catch(error => {
            console.log("error");
        })
    }
    //*******************************************************************************************/




    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header-honoraward">
                    <h4>
                        Honors & Awards
                        <QuestionCircle id="card-info" onClick={handleShowDetails}/>
                        <PlusCircle id="add-honoraward" onClick={handleShowAddExperience}/>
                        <Tooltip target="add-honoraward" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>
                <Card.Body id="card-body">
                    <Card.Text className="honoraward"></Card.Text>
                </Card.Body>
            </Card>
            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header>
                    <Modal.Title>Details</Modal.Title>
                    <XCircle id="honoraward-details" onClick={handleCloseDetails}/>
                </Modal.Header>
                <ModalBody>
                    <p>Add Honors/Rewards (if any)
                        <br/>
                        <br/>
                    </p>
                </ModalBody>
            </Modal>
            <Modal show={showAddExperience} onHide={handleCloseAddExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Honors and Awards</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSave}>
                            <h6>AwardTitle</h6>
                            <input type="text" name="title" className="form-input" onChange={e => setAwardTitle(e.target.value)}/>
                            <h6>Description</h6>
                            <input type="text" name="description" className="form-input honoraward-textarea" onChange={e => setDesc(e.target.value)}/>
                            <h6>ReceivedFrom</h6>
                            <input type="text" name="receivedFrom" className="form-input" onChange={e => setRecefrom(e.target.value)}/>
                            <h6>Received On</h6>
                            <input type="date" name="dateReceived" className="form-input" onChange={e => setReceon(e.target.value)}/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddExperience}>Close</Button>
                        <Button variant="primary" onClick={handleSave}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showUpdateExperience} onHide={handleCloseUpdateExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Edit Honors and Awards</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                        <h6>AwardTitle</h6>
                            <input type="text" name="awardtitle" className="form-input" value ={title} onChange={e => setAwardTitle(e.target.value)}/>
                            <h6>Description</h6>
                            <input type="text" name="description" className="form-input honoraward-textarea" value ={description} onChange={e => setDesc(e.target.value)}/>
                            <h6>ReceivedFrom</h6>
                            <input type="text" name="receivedFrom" className="form-input" value ={receivedFrom} onChange={e => setRecefrom(e.target.value)}/>
                            <h6>Received On</h6>
                            <input type="date" name="Received On" className="form-input" value ={dateReceived} onChange={e => setReceon(e.target.value)}/>


                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdateExperience}>Close</Button>
                        <Button variant="primary" onClick={() => {handleCloseUpdateExperience();handleUpdate(id);}}>Update</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default HonorAwards
