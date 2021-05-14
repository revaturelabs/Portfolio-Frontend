import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/IndustryEquivalency.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Card, Button, Modal} from 'react-bootstrap';
import { QuestionCircle, PlusCircle } from 'react-bootstrap-icons'
import { Tooltip } from 'reactstrap';

const IndustryEquivalency = () => {
    // Modal show and hide
    /* ---------------------------------- */
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }
    /* ---------------------------------- */

    // Tooltip for add and details buttons
    /* ---------------------------------------------------------------- */
    const [addTooltipOpen, setAddTooltipOpen] = useState(false)
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen)
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen)
    /* ---------------------------------------------------------------- */

    // Industry Equivalency State Variables
    /* ------------------------------------------------------ */
    const [skillSet, setSkillSet] = useState<Array<Array<string>>>([]);
    axios.get('http://3.236.213.150:8081/equiv')
        .then(resp => {
            console.log(resp)
        })
        .catch(error => {
            console.error(error)
        })
    const [skillName, setSkillName] = useState('');
    const [previousExp, setPreviousExp] = useState<string>('0');
    const [currentExp, setCurrentExp] = useState<string>('0');
    const [equivalency, setEquivalency] = useState<number>(0);
    const [maxEquivalency, setMaxEquivalency] = useState<number>(0);
    useEffect(() => {
        setEquivalency(+previousExp + +currentExp);
        // console.log("equivalency is: " + equivalency);
    }, [previousExp, currentExp, equivalency]);
    /* ------------------------------------------------------ */

    // Handle the Add functionality
    /* -------------------------------------- */
    const handleAdd = () => {
        if (equivalency > maxEquivalency) { setMaxEquivalency(equivalency); }
        const tempArray1: Array<string> = [skillName,equivalency.toString()];
        const tempSkillSet: Array<Array<string>> = [['','']];
        tempSkillSet.pop();
        tempSkillSet.push(...skillSet);
        tempSkillSet.push(tempArray1);
        tempSkillSet.sort();
        setSkillSet(tempSkillSet);
        setShow(false);
        setSkillName('');
        setPreviousExp('0');
        setCurrentExp('0');
    }
    /* -------------------------------------- */

    // Information meassage
    const message: string = "This section will show your industry equivalent level of experience in certain skills.\n"
                            + "Select a skill and answer two questions to generate values for the section."

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header-industry-equivalence">
                    <h4>
                        Industry Equivalency
                        <QuestionCircle id="card-info" onClick={() => (alert(message))} />
                        <PlusCircle id="add-experience" onClick={handleShow} />
                        <Tooltip target="add-experience" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>
                <Modal show={show} onHide={handleClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add a Skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post">
                            <div className="form-group">
                                <label htmlFor="skillTitle"><h6>Skill Title</h6></label>
                                <select
                                    className="form-control"
                                    name="skillTitle"
                                    value={skillName}
                                    onChange={ (ev) => { setSkillName(ev.target.value); } }>
                                    <option value="" disabled>Select a skill</option>
                                    <option value="Java">Java</option>
                                    <option value="SQL">SQL</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="TypeScript">TypeScript</option>
                                    <option value="Angular 2+">Angular 2+</option>
                                    <option value="Spring Framework">Spring Framework</option>
                                    <option value="Spring Data">Spring Data</option>
                                    <option value="Spring Boot">Spring Boot</option>
                                    <option value="Spring MVC">Spring MVC</option>
                                    <option value="Spring AOP">Spring AOP</option>
                                    <option value="Hibernate">Hibernate</option>
                                    <option value="JDBC">JDBC</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Microservices">Microservices</option>
                                    <option value="JUnit">JUnit</option>
                                    <option value="AWS">AWS</option>
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="previousExperience"><h6>How much experience would you say you had with this before starting with Revature?</h6></label>
                                <select
                                    className="form-control"
                                    name="previousExperience"
                                    value={previousExp}
                                    onChange={ (ev) => { setPreviousExp(ev.target.value); } }>
                                    <option value="0">None / I'd never heard of it</option>
                                    <option value="1">Cursory Study (No Hands-on Experience)</option>
                                    <option value="2">Simple Project Work (Minor Hands-on Experience)</option>
                                    <option value="3">Extensive Project Work (Fair amount of Hands-on Experience)</option>
                                    <option value="6">Involved in Multiple Projects (Substantial Hands-on Experience)</option>
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="currentExperience"><h6>How many weeks of study and/or project work involved this subject during your training?</h6></label>
                                <select
                                    className="form-control"
                                    name="currentExperience"
                                    value={currentExp}
                                    onChange={ (ev) => { setCurrentExp(ev.target.value); } }>
                                    <option value="0">None</option>
                                    <option value="1">It was one of the last things I learned</option>
                                    <option value="3">I used it in at least one project</option>
                                    <option value="6">I used it in about half of my projects</option>
                                    <option value="9">I used it in most of my projects</option>
                                    <option value="12">I worked directly with it in every project</option>
                                </select>
                            </div>
                            <div className="form-group"><input type="hidden" className="form-control" name="equivalencyValue" value={equivalency} readOnly /></div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAdd}>Save</Button>
                    </Modal.Footer>
                </Modal>
                {/* <Modal show={show} onHide={handleClose} backdrop="Static">
                    <Modal.Header></Modal.Header>
                    <Modal.Body></Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal> */}
                <Card.Body>
                    <Card.Text>
                        <div className="row" style={{height: "220px"}}>
                            {skillSet.map((s) => (
                                <div className="col-sm m-2 fill-box justify-content-center">
                                    <h5 className={"tall-text p-2 ring-" + Math.round(+s[1] * 10 / maxEquivalency)}>{s[1]}</h5>
                                    <h5>{s[0]}</h5>
                                </div>
                            ))}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default IndustryEquivalency;