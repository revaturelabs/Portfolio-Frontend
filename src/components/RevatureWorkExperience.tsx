import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Card, Button, Modal} from 'react-bootstrap';
import '../css/RevatureWorkExperience.css';

const RevatureWorkExperience = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>
                        Card Title
                        <Button variant="primary" id="add-experience" onClick={handleShow}>Add</Button>
                    </h4>
                </Card.Header>
                <Modal show={show} onHide={handleClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add Work Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Employer Name
                        <input type="email" name="" id="" /> <br/>
                        From 
                        <input type="date" name="" id="" /> <br/>
                        To 
                        <input type="date" name="" id="" /> <br/>
                        Job Title
                        <input type="text" name="" id="" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Card.Body>
                    <Card.Text>
                        Some Content, Some Content <br />
                       Some Content, Some Content <br />
                       Some Content, Some Content <br />
                       Some Content, Some Content
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RevatureWorkExperience
