import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/IndustryEquivalency.css';
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { QuestionCircle, PlusCircle, Pencil, XCircle, Save } from 'react-bootstrap-icons';
import { Tooltip } from 'reactstrap';

// Define Skill data structure
/* ------------------------ */
export interface Skill {
    id: number;
    header: string;
    value: number;
    portfolio: {
        id: number;
        name: string;
        user: {
            id: number;
            name: string;
            password: string;
            admin: boolean;
        }
        submitted: boolean;
        approved: boolean;
        reviewed: boolean;
        feedback: string;
    }
}
/* ------------------------ */

// Create Option Object Type
/* ------------------------ */
export interface Option {
    value: string;
    labelText: string;
    disabledStatus: boolean;
}
/* ------------------------ */

// Define Portfolio Number
/* ------------------------ */
let portfolioID: number = 1;
/* ------------------------ */

const IndustryEquivalency = () => {

    // Remove Add Button if Maximum Skill Number is reached
    /* ------------------------------------------------ */
    const [skillsAtMax, setSkillsAtMax] = useState(false);
    /* ------------------------------------------------ */

    // Modal Add show and hide
    /* ---- */
    const [showAdd, setShowAdd] = useState(false);
    const handleAddClose = () => {
        setShowAdd(false);
    };
    const handleAddShow = () => {
        if (skillsAtMax) {
            alert("No more than 5 skills can be added to the Industry Equivalency Section.");
            return;
        };
        setShowAdd(true);
    };
    /* ---- */

    // Modal Edit show and hide
    /* ---- */
    const [showEdit, setShowEdit] = useState(false);
    const [editSkillSet, setEditSkillSet] = useState<Array<Skill>>([]);
    const handleEditClose = () => {
        setShowEdit(false);
        setEditSkillSet([]);
    }
    const handleEditShow = () => {
        let tempSkillSet: Array<Skill> = [];
        skillSet.forEach((s) => {
            let tempSkill: Skill = {
                id: s.id,
                header: s.header,
                value: s.value,
                portfolio: s.portfolio
            }
            tempSkillSet.push(tempSkill);
        });
        setEditSkillSet(tempSkillSet);
        setShowEdit(true);
    };
    /* ---- */

    // Tooltip for add and details buttons
    /* ---------------------------------------------------------------- */
    const [addTooltipOpen, setAddTooltipOpen] = useState(false);
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen);
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false);
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen);
    /* ---------------------------------------------------------------- */

    // GET Skill Data
    /* -------------------------------------------------------- */
    const [skillSet, setSkillSet] = useState<Array<Skill>>([]);
    useEffect(() => {
        // Re-Calculate Max Equivalency Whenever skillSet is changed
        let tempMax: number = 0;
        skillSet.forEach((s) => {
            if (s.value > tempMax) {
                tempMax = s.value;
            }
        })
        setMaxEquivalency(tempMax);
        setSkillsAtMax(skillSet.length >= 5);
    }, [skillSet]);
    const [maxEquivalency, setMaxEquivalency] = useState<number>(0);
    const aquireSkillSet = () => {
        axios.get('http://3.236.213.150:8081/equiv')
            .then(resp => {
                let copySkillSet: Array<Skill> = [...resp.data];
                let tempSkillSet: Array<Skill> = [];
                let tempMax: number = 0;
                copySkillSet.forEach(skill => {
                    if (skill.portfolio.id == portfolioID) {
                        tempSkillSet.push(skill);
                        if (skill.value > tempMax) {
                            tempMax = skill.value;
                        };
                    };
                });
                console.log(tempSkillSet);
                console.log("Highest Equivalency is " + tempMax);
                setSkillSet(tempSkillSet);
            })
            .catch(error => {
                console.error(error);
            });
    }
    useEffect(() => { aquireSkillSet() }, []);
    /* -------------------------------------------------------- */

    // Industry Equivalency State Variables
    /* -------------------------------------------------------- */
    const [skillName, setSkillName] = useState('');
    const [previousExp, setPreviousExp] = useState<string>('0');
    const [currentExp, setCurrentExp] = useState<string>('0');
    const [equivalency, setEquivalency] = useState<number>(0);
    useEffect(() => {
        setEquivalency(+previousExp + +currentExp);
    }, [previousExp, currentExp, equivalency]);
    /* -------------------------------------------------------- */

    // Create SELECT options programmatically
    /* ---------------------------------------------------------------- */
    const titleOptions: Array<Option> = [
        { value: '', labelText: 'Select a skill', disabledStatus: true },
        { value: 'Java', labelText: 'Java', disabledStatus: false },
        { value: 'SQL', labelText: 'SQL', disabledStatus: false },
        { value: 'JavaScript', labelText: 'JavaScript', disabledStatus: false },
        { value: 'TypeScript', labelText: 'TypeScript', disabledStatus: false },
        { value: 'Angular 2+', labelText: 'Angular 2+', disabledStatus: false },
        { value: 'Spring Framework', labelText: 'Spring Framework', disabledStatus: false },
        { value: 'Spring Data', labelText: 'Spring Data', disabledStatus: false },
        { value: 'Spring Boot', labelText: 'Spring Boot', disabledStatus: false },
        { value: 'Spring MVC', labelText: 'Spring MVC', disabledStatus: false },
        { value: 'Spring AOP', labelText: 'Spring AOP', disabledStatus: false },
        { value: 'Hibernate', labelText: 'Hibernate', disabledStatus: false },
        { value: 'JDBC', labelText: 'JDBC', disabledStatus: false },
        { value: 'DevOps', labelText: 'DevOps', disabledStatus: false },
        { value: 'Microservices', labelText: 'Microservices', disabledStatus: false },
        { value: 'JUnit', labelText: 'JUnit', disabledStatus: false },
        { value: 'AWS', labelText: 'AWS', disabledStatus: false }
    ];
    const prevExpOption: Array<Option> = [
        { value: "0", labelText: "None / I'd never heard of it", disabledStatus: false },
        { value: "1", labelText: "Cursory Study (No Hands-on Experience)", disabledStatus: false },
        { value: "2", labelText: "Involved in at Least One Project (Minor Hands-on Experience)", disabledStatus: false },
        { value: "4", labelText: "Involved in Multiple Projects (Substantial Hands-on Experience)", disabledStatus: false }
    ];
    const currExpOption: Array<Option> = [
        { value: "0", labelText: "None", disabledStatus: false },
        { value: "3", labelText: "I used it in at least one project", disabledStatus: false },
        { value: "6", labelText: "I used it in about half of my projects", disabledStatus: false },
        { value: "12", labelText: "I worked directly with it in every project", disabledStatus: false }
    ];
    /* ---------------------------------------------------------------- */

    // Handle the Add functionality
    /* ---------------------------------------------------------------- */
    const handleAdd = async () => {
        axios.get('http://3.236.213.150:8081/portfolios/' + portfolioID)
            .then(resp => {
                // If portfolio with portfolioID exists, Create new Skill with data
                let newSkill: Skill = {
                    id: 0,
                    header: skillName,
                    value: equivalency,
                    portfolio: resp.data
                }
                axios.post('http://3.236.213.150:8081/equiv', newSkill)
                    .then(resp => {
                        // If POST is successful, add new Skill (with correct data) to the Skill Array
                        let tempSkillSet: Array<Skill> = [...skillSet];
                        tempSkillSet.push(resp.data);
                        setSkillSet(tempSkillSet);
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
            .catch(error => {
                console.error(error);
            });
        setShowAdd(false);
        setSkillName('');
        setPreviousExp('0');
        setCurrentExp('0');
    };
    /* ---------------------------------------------------------------- */

    // Handle the Delete Functionality
    /* -------------------------------------------------------------------------------- */
    const handleDelete = async (remSkill: Skill) => {
        console.log('axios.delete(\'http://3.236.213.150:8081/equiv/' + remSkill.id + '\')');
        // axios.delete('http://3.236.213.150:8081/equiv/' + remSkill.id)
        //     .then(resp => {
        //         console.log(resp.data);
        //         let tempSkillSet: Array<Skill> = [...skillSet];
        //         tempSkillSet.splice(tempSkillSet.indexOf(remSkill),1);
        //         setSkillSet(tempSkillSet);
        //         setMaxSkills(true);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     })
    };
    /* -------------------------------------------------------------------------------- */

    // Handle the Edit Table Changes
    /* -------------------------------------------------------------------------------- */
    const handleEditChange = (changeType: number, changeSkill: number, newValue: string) => {
        let tempSkillSet = [...editSkillSet];
        tempSkillSet.forEach((s) => {
            if (s.id == changeSkill) {
                if (changeType == 1) {
                    s.header = newValue;
                }
                if (changeType == 2) {
                    s.value = +newValue;
                }
            }
        });
        setEditSkillSet(tempSkillSet);
    }
    /* -------------------------------------------------------------------------------- */

    // Handle Saving the Edit Table
    /* ---- */
    const handleEdit = () => {
        editSkillSet.forEach(async (s) => {
            await axios.post('http://3.236.213.150:8081/equiv/portfolios/' + s.id, s)
                .then((resp) => { })
                .catch((error) => {
                    console.error(error);
                })
        });
        setSkillSet([...editSkillSet]);
        handleEditClose();
    }

    // Section Description
    /* ------------------------------------------------------------------------------------------------------------ */
    const message: string = "This section will show your industry equivalent level of experience in certain skills.\n"
        + "Select a skill and answer two questions to generate values for the section.";
    /* ------------------------------------------------------------------------------------------------------------ */

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header-industry-equivalence">
                    <h4>
                        Industry Equivalency
                        <QuestionCircle id="card-info" onClick={() => (alert(message))} />
                        <Pencil id="edit-equivalency" onClick={handleEditShow} />
                        <PlusCircle id="add-equivalency" onClick={handleAddShow} />
                        <Tooltip target="add-equivalency" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>
                <Modal show={showAdd} onHide={handleAddClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add a Skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="skillTitle"><h6>Skill Title</h6></label>
                                <select
                                    className="form-control"
                                    name="skillTitle"
                                    value={skillName}
                                    onChange={(ev) => { setSkillName(ev.target.value); }}>
                                    {titleOptions.map((o) => (
                                        <option value={o.value} disabled={o.disabledStatus} key={o.value}>{o.labelText}</option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="previousExperience"><h6>How much experience would you say you had with this before starting with Revature?</h6></label>
                                <select
                                    className="form-control"
                                    name="previousExperience"
                                    value={previousExp}
                                    onChange={(ev) => { setPreviousExp(ev.target.value); }}>
                                    {prevExpOption.map((o) => (
                                        <option value={o.value} disabled={o.disabledStatus} key={o.value}>{o.labelText}</option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="currentExperience"><h6>How much project work involved this subject during your training at Revature?</h6></label>
                                <select
                                    className="form-control"
                                    name="currentExperience"
                                    value={currentExp}
                                    onChange={(ev) => { setCurrentExp(ev.target.value); }}>
                                    {currExpOption.map((o) => (
                                        <option value={o.value} disabled={o.disabledStatus} key={o.value}>{o.labelText}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group"><input type="hidden" className="form-control" name="equivalencyValue" value={equivalency} readOnly /></div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddClose}>Close</Button>
                        <Button variant="primary" onClick={handleAdd}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEdit} onHide={handleEditClose} backdrop="Static">
                    <Modal.Header>
                        <Modal.Title>Edit Your Skills</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <table>
                                <tr>
                                    <th>Skill Name</th>
                                    <th>Industry Equivalency</th>
                                </tr>
                                {editSkillSet.map((s) => (
                                    <tr key={s.id}>
                                        <td>
                                            <select
                                                className="form-control"
                                                value={s.header}
                                                onChange={(ev) => { handleEditChange(1, s.id, ev.target.value) }}>
                                                {titleOptions.map((o) => (
                                                    <option value={o.value} disabled={o.disabledStatus} key={o.value}>{o.labelText}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                step="1"
                                                min="3"
                                                value={s.value}
                                                onChange={(ev) => { handleEditChange(2, s.id, ev.target.value) }} />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditClose}>Close</Button>
                        <Button variant="primary" onClick={handleEdit}><Save /> Save</Button>
                    </Modal.Footer>
                </Modal>
                <Card.Body>
                    <Card.Text>
                        <div className="row" style={{ height: "220px" }}>
                            {skillSet.map((s) => (
                                <div className="col-sm m-2 fill-box justify-content-center" key={s.id}>
                                    <h5 className={"tall-text p-2 ring-" + Math.round(s.value * 10 / maxEquivalency)}>{s.value}</h5>
                                    <h5>{s.header} <XCircle id="delete-equivalency" className="text-danger" onClick={() => handleDelete(s)} /></h5>
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