import { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { PlusCircle, QuestionCircle } from 'react-bootstrap-icons';
import { Tooltip } from 'reactstrap';

const SkillMatrix = () => {
    const [modal, setModal] = useState(false);
    const handleModal = () => setModal(!modal);

    const [skill, setSkill] = useState("");
    const [subSkill, setSubSkill] = useState("");
    const [experience, setExperience] = useState("");

    const addSkill = () => {
        
    }

    return (
        <div className="skillMatrixComponent">
            <Card>
                <Card.Header>
                    Skill Experience
                <QuestionCircle id="info" onClick={handleModal} />
                    <PlusCircle id="addSkill" onClick={handleModal} />
                    <Tooltip target="addSkill">Add</Tooltip>
                    <Tooltip target="info" >Details</Tooltip>
                </Card.Header>
                <Card.Body>
                    <div className="skillMatrixCard">
                        {/* {Object.entries(this.state.skillList).map(skill => {
                        <Card bg={'dark'} text={'light'} style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title> skill </Card.Title>
                        <Card.Text>
                            Testing 123
                        </Card.Text>
                        </Card.Body>
                        </Card>
                    })} */}
                    </div>

                </Card.Body>
            </Card>
            <Modal show={modal} onHide={handleModal} >
                <Modal.Header>
                    <Modal.Title>Add Skill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="skill"><b>Skill</b></label><br/>
                    <input id="skill" onChange={event => setSkill(event.target.value)}/><br/><br/>
                    <label htmlFor="subSkill" ><b>Sub Skill</b></label><br/>
                    <input id="subSkill" onChange={event => setSubSkill(event.target.value)}/><br/><br/>
                    <label htmlFor="experience"><b>Experience</b></label><br/>
                    <input id="experience" onChange={event => setExperience(event.target.value)}/><br/><br/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal}>Close</Button>
                    <Button variant="primary" onClick={addSkill}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SkillMatrix;