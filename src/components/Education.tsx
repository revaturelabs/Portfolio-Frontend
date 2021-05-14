import axios from "axios";
import { setgid } from "process";
import React, { useState, useEffect } from 'react'
import { Button, Card, Modal, ModalTitle } from "react-bootstrap";
import { PlusCircle, QuestionCircle } from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";
import "../css/Project.css";

const Education = () => {

    // Update Modal show and hide
    //**************************************************************************/
    const [showUpdateExperience, setShowUpdateExperience] = useState(false)
    const handleCloseUpdateExperience = () => setShowUpdateExperience(false)
    const handleShowUpdateExperience = () => setShowUpdateExperience(true)

    /**
     * Show/Hide Modal
     */
    const [showModal, setShowModal] = useState(false);
    const handleHideModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    /**
     * Tooltip for add button
     */
    const [showAddTooltip, setShowAddTooltip] = useState(false);
    const toggleAddTooltip = () => setShowAddTooltip(!showAddTooltip);

    /**
     * Tooltip for details button
     */
    const [showDetailsTooltip, setShowDetailsTooltip] = useState(false);
    const toggleDetailsTooltip = () => setShowDetailsTooltip(!showDetailsTooltip);

    /**
     * 'Add education' state handling
     */
    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");
    const [graduationDate, setGraduationDate] = useState("");
    const [gpa, setGpa] = useState("");
    const [logoUrl, setLogoUrl] = useState("");

    /**
     * Render education on page
     */
    const createProject = () => {
        let educations: Array<string> = [
            university,
            degree,
            graduationDate,
            gpa,
            logoUrl,
        ];
        let education = document.querySelector(".education");
        let div = document.createElement("div");

        for (let index = 0; index < educations.length; index++) {
            let header = document.createElement("h1");
            div.appendChild(header);
            header.innerHTML = educations[index];
            education?.appendChild(div);
        }

        setUniversity("");
        setDegree("");
        setGraduationDate("");
        setGpa("");
        setLogoUrl("");

        div.style.border = "2px solid black";
    };

    // Get data from data base
    //***********************************************************/
    // const getData = async () => {
    //     axios.get("localhost:8081/education")
    //     .then(resp => {
    //     console.log(resp.data)
    //     createAllEducation(resp.data)
    //     })
    //     .catch(error => {
    //     console.log("error")
    //     })
    //     }
    //     useEffect(() => {getData()}, [])
    //***********************************************************/

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            //setTasks(tasksFromServer);
        }

        getTasks();
    }, [])


    const fetchTasks = async () => {
        const res = await fetch('http://localhost:8081/education');
        const data = await res.json();
        console.log(data)
        createAllEducation(data)
        return data;
    }


    const createAllEducation = (data: any) => {

        let headerNum: number = 1
        for (let index = 0; index < data.length; index++) {
            let gpa = document.createElement("h5")
            let universityVariable = document.createElement("h3")
            let degree = document.createElement("h1")
            let educationParent = document.querySelector(".education")
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
            cardBody.innerHTML = "Here we can put more information on the degree" // <--- this is temp
            card.appendChild(cardBody)

            editDiv.appendChild(editButton)
            editButton.style.float = "right"
            editButton.innerHTML = "Edit"
            editButton.addEventListener("click", () => {
                handleShowUpdateExperience()
            })
            cardHeader.appendChild(editDiv)
            cardHeader.appendChild(degree)
            cardHeader.appendChild(universityVariable)
            cardHeader.appendChild(gpa)
            
            //universityTitle.innerHTML = "Name of University: " 
            universityVariable.innerHTML = data[index].university
            degree.innerHTML = data[index].degree
            gpa.innerHTML = "GPA: " + data[index].gpa
            //universityVariable.innerHTML = "Name of Degree: " + data[index].degree

            // if (headerNum === 1) {
            //     universityTitle.style.fontWeight = "bold"
            // } else if (headerNum === 3) {
            //     universityTitle.style.color = "rgb( 242, 105, 3)"
            // }

            cardHeader.style.borderBottom = "5px solid rgb(115, 165, 194)"
            cardHeader.style.backgroundColor = "white"
            educationParent?.appendChild(card)

            if (Number(educationParent?.childElementCount) > 1) {
                card.style.marginTop = "50px"
            }

            headerNum++

        }
    }
    //*********************************************************************/
    /**
     * Save data to database
     */
    const handleSave = () => {
        // let newEducation = {
        //     university:university,
        //     degree:degree,
        //     graduationDate:graduationDate,
        //     gpa:gpa,
        //     logoUrl:logoUrl,
        // };
        axios
            .post("http://localhost:8081/education", {
                university,
                degree,
                graduationDate,
                gpa,
                logoUrl
            })
            .then((response) => {
                console.log("success: newEducation");
                //console.log(newEducation);
            })
            .catch((error) => {
                console.log("error");
            });

        setShowModal(false);
        window.location.reload();
    };

    const handleUpdate = () => {
        let newEducation = {
            university: university,
            degree: degree,
            graduationDate: graduationDate,
            gpa: gpa,
            logoUrl: logoUrl,
        };
        axios
            .put("http://3.236.213.150:8081/projects", { newEducation })
            .then((response) => {
                console.log("success");
                console.log(newEducation);
            })
            .catch((error) => {
                console.log("error");
            });
    };

    /**
     * Details message
     */
    const messageDetails: string = "BLah blha blah";

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header-project">
                    <h4>
                        Education and Certifications
                        <QuestionCircle
                            id="card-info"
                            onClick={() => alert(messageDetails)}
                        />
                        <PlusCircle id="add-project" onClick={handleShowModal} />
                        <Tooltip
                            target="card-info"
                            isOpen={showDetailsTooltip}
                            toggle={toggleDetailsTooltip}
                        >
                            Details
                        </Tooltip>
                        <Tooltip
                            target="add-project"
                            isOpen={showAddTooltip}
                            toggle={toggleAddTooltip}
                        >
                            Add Education
                        </Tooltip>
                    </h4>
                </Card.Header>
                <Modal show={showModal} onHide={handleHideModal} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add Education</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post">
                            <h6>University Name</h6>
                            <input
                                type="text"
                                name="university"
                                className="form-input"
                                onChange={(e) => setUniversity(e.target.value)}
                            />
                            <br />
                            <h6>Degree Attained</h6>
                            <input
                                type="text"
                                name="degree"
                                className="form-input"
                                onChange={(e) =>
                                    setDegree(e.target.value)
                                }
                            />
                            <br />
                            <h6>Graduation Date</h6>
                            <input
                                type="text"
                                name="graduationDate"
                                className="form-input"
                                onChange={(e) =>
                                    setGraduationDate(e.target.value)
                                }
                            />
                            <br />
                            <h6>GPA</h6>
                            <input
                                type="text"
                                name="gpa"
                                className="form-input"
                                onChange={(e) => setGpa(e.target.value)}
                            />
                            <br />
                            <h6>Logo for the Url</h6>
                            <input
                                type="text"
                                name="logoUrl"
                                className="form-input"
                                onChange={(e) => setLogoUrl(e.target.value)}
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleHideModal}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleSave();
                                //createProject();
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Card.Body>
                    <Card.Text className="education"></Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Education;
