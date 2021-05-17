import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Button, Modal} from 'react-bootstrap';
import { QuestionCircle, PlusCircle } from 'react-bootstrap-icons';
import '../css/OtherWorkExperience.css'

const OtherWorkExperience = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [employer, setEmployer] = useState("");
    const [title, setTitle] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [description, setDescription] = useState("");
    const [tool, setTool] = useState("");
    const [date, setDate] = useState("");    

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
            // employer,
            title,
            responsibilities,
            description,
            tool,
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
        setTool("");
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
            
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add Other Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSave}>
                        <div className="form-group">
                            <label className="">title</label>
                            <input type="text" name="empName" id="" className="w-100" onChange={ (e)=> setTitle(e.target.value) }/>
                        </div>
                        
                        <div className="form-group">
                            <label>Responsibilities</label> 
                            <input type="text" name="fromDate" id="" className="w-100" placeholder="" onChange={ (e) => setResponsibilities(e.target.value)}/> 
                        </div>
                        <div className="form-group">
                            <label>Description</label> 
                            <input type="text" name="toDate" id="" className="w-100" placeholder="" onChange={ (e) => setDescription(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Tools</label>
                            <input type="text" name="jobTitle" id="" className="w-100" placeholder="" onChange={ (e) => setTool(e.target.value)}/>
                        </div> 
                        <div className="form-group">
                            <label>Date</label>
                            <input type="text" name="jobTitle" id="" className="w-100" placeholder="" onChange={ (e) => setDate(e.target.value)}/>
                        </div> 
                        <hr className="w-100 my-3"/>
                        <div className="text-center">
                        <Button variant="primary" className="mx-1" onClick={()=>{ handleClose(); handleSave();}}>Save</Button>
                        <Button variant="secondary" className="mx-1" onClick={handleClose}>Cancel</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <div>
            <div className="card mx-auto my-4 border-rounded">
            <div className="card-header" id="header"> 
                <div className="row">
                    <div className="col">
                    <h4 className="text-light">Other Work Experience  
                        <span> </span>
                        <span>
                        <QuestionCircle id="" onClick={() => {alert("getting data from API");}} />
                        </span>
                        <span> </span>
                        <span>
                        <PlusCircle className="pt-2" id="add-experience" onClick={handleShow} />
                        </span>
                    </h4>
                    </div>
                </div>     
            </div>
                
            <div className="card-body" id="addWorkExperience">
                
            </div>

            <div className="card-footer">
                
            </div>
            </div>
        </div>

        </div>
    )
}

export default OtherWorkExperience
