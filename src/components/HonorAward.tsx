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
    const [awardTitle, setAwardTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [rfrom, setRfrom] = useState('')
    const [ron, setRon] = useState('')
    //***************************************************/

    

    // Get data from data base
    //***********************************************************/
    const getData = async () => {
        axios.get("http://3.236.213.150:8081/honors")
        .then(response => {
            console.log(response.data)
            response.data.map((data: any) => {
            createHonorAward(data.Atitle,data.desc,data.rfom,data.ron)
        })
        })
    }
    useEffect(() => {getData()}, [])
    //***********************************************************/

    //Render honor awards on page
    //*********************************************************************/
    const createHonorAward = (awardTitle: string, desc: string, rfrom: string, ron:string) => {

            let honoraward = document.querySelector('.honoraward')
            let div = document.createElement('div')
    
            
                let atitle = document.createElement('p')
                let adesc = document.createElement('h6')
                let refrom = document.createElement('h6')
                let reOn = document.createElement('h6')

                atitle.innerHTML = "Award Title: " + awardTitle
                setAwardTitle(awardTitle)
                console.log(awardTitle)
                adesc.innerHTML = "Description: " + desc
                setDesc(desc)
                console.log(desc)
                refrom.innerHTML = "Received From: " + rfrom
                setRfrom(rfrom)
                console.log(rfrom)
                reOn.innerHTML = "Received On: " + ron
                setRon(ron)
                console.log(ron)

                atitle.style.color = "grey"
                atitle.style.whiteSpace = "pre-wrap"
                atitle.style.marginBottom = "50px"
                adesc.style.color = "grey"
                refrom.style.color = "grey"
                reOn.style.color = "grey"

    
    
                div.appendChild(atitle)
                div.appendChild(adesc)
                div.appendChild(refrom)
                div.appendChild(reOn)
                honoraward?.appendChild(div) 
    
            div.style.padding = "5px"
            // div.style.border = "2px solid black"
            div.style.marginBottom = "10px"
        
        } 
    
    //*********************************************************************/

    // Save data to database
    //***************************************************/


    const handleSave = () => {
        console.log("awardtitle" + awardTitle);

        axios.post("http://3.236.213.150:8081/honors", {
            awardTitle,
            desc,
            rfrom,
            ron
 
        })
        .then(resp => {
            console.log(resp.data);
            console.log("honorawards saved succesfully")
        })
        .catch(error => {
            console.log("error")
        })
        setAwardTitle('');
        setDesc('');
        setRfrom('');
        setRon('');
        setShowExperience(false)
    }
    //***************************************************/


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
                            <input type="text" name="awardtitle" className="form-input" onChange={e => setAwardTitle(e.target.value)}/>
                            <h6>Description</h6>
                            <input type="text" name="description" className="form-input honoraward-textarea" onChange={e => setDesc(e.target.value)}/>
                            <h6>ReceivedFrom</h6>
                            <input type="text" name="receivedFrom" className="form-input" onChange={e => setRfrom(e.target.value)}/>
                            <h6>Received On</h6>
                            <input type="date" name="Received On" className="form-input" onChange={e => setRon(e.target.value)}/>
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
                            <input type="text" name="awardtitle" className="form-input" onChange={e => setAwardTitle(e.target.value)}/>
                            <h6>Description</h6>
                            <input type="text" name="description" className="form-input honoraward-textarea" onChange={e => setDesc(e.target.value)}/>
                            <h6>ReceivedFrom</h6>
                            <input type="text" name="receivedFrom" className="form-input" onChange={e => setRfrom(e.target.value)}/>
                            <h6>Received On</h6>
                            <input type="date" name="Received On" className="form-input" onChange={e => setRon(e.target.value)}/>


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

export default HonorAwards
