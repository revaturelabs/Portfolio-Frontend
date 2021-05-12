import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Card, Button, Modal} from 'react-bootstrap';
import { QuestionCircle, PlusCircle, Pencil } from 'react-bootstrap-icons';
import '../css/OtherWorkExperience.css'

const OtherWorkExperience = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [empName, setEmpName] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [jobTitle, setJobTitle] = useState("");

    const createWorkExperience = () => {
        let exp: Array<string> = [
            empName,
            fromDate,
            toDate,
            jobTitle
        ]

        // veryfying that data is being caught before rendered in the card
        console.log(exp);


        let addWorkExperience = document.getElementById("addWorkExperience");
        let div = document.createElement('div');

        for (let index = 0; index < exp.length; index++) {
            let header = document.createElement('div');
            div.appendChild(header);
            header.innerHTML = exp[index];
            header.classList.add("card");
            addWorkExperience?.appendChild(div);

            // return (
            //     <div>
            //         <h1> {exp[index]}</h1>
            //         <div>{exp[index+1]}</div>
            //         <div>{exp[index+2]}</div>
            //         <div>{exp[index+3]}</div>
            //     </div>
            // );
        }
    }
    
    return (
        <div className="container">
            
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add Other Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="">Employer Name</label>
                        <input type="text" name="empName" id="" className="w-100" onChange={ (e)=> setEmpName(e.target.value) }/>
                    </div>
                    
                    <div className="form-group">
                        <label>From</label> 
                        <input type="date" name="fromDate" id="" className="w-100" placeholder="From" onChange={ (e) => setFromDate(e.target.value)}/> 
                    </div>
                    <div className="form-group">
                        <label>To</label> 
                        <input type="date" name="toDate" id="" className="w-100" placeholder="To" onChange={ (e) => setToDate(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" name="jobTitle" id="" className="w-100" placeholder="" onChange={ (e) => setJobTitle(e.target.value)}/>
                    </div>                
                </Modal.Body>
                <Modal.Footer className="">
                    <div className="mx-auto">
                    <Button variant="primary" className="mx-1" onClick={()=>{ handleClose(); alert("Changes are saved!"); createWorkExperience();}}>Save</Button>
                    <Button variant="secondary" className="mx-1" onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <div>
            <div className="card mx-auto my-4 border-rounded">
            <div className="card-header" id="header"> 
                <div className="row">
                    <div className="col">
                    <h4 className="text-light">Other Work Experience  
                        <span> </span>
                        <span>
                        <QuestionCircle id="" onClick={() => (alert("hello world"))} />
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
                {/* {createWorkExperience()} */}
            </div>
            </div>
        </div>

        </div>
    )
}

export default OtherWorkExperience
