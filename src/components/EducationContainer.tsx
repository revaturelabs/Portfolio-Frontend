import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Card, Modal } from "react-bootstrap";
import { PlusCircle, QuestionCircle } from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";
import "../css/Project.css";
import EducationCreation from './EducationCreation';
import EducationDisplay from "./EducationDisplay";

interface User {
    id: number;
    name: string;
    password: string;
    admin: boolean;
}

interface Portfolio {
    id: number;
    name: string;
    user: User;
    submitted: boolean;
    approved: boolean;
    reviewed: boolean;
    feedback: string;
}

interface Education {
    id: number;
    portfolio: Portfolio;
    university: string;
    degree: string;
    graduationDate: string;
    gpa: number;
    logoUrl: string;
}

const EducationContainer = () => {
    const [educations, setEducations] = useState(Array<Education>());

    const [showCreationModal, setShowCreationModal] = useState(false);
    const handleHideCreationModal = () => setShowCreationModal(false);
    const handleShowCreationModal = () => setShowCreationModal(true);

    /**
     * State handler for plus icon
     */
    const [showAddTooltip, setShowAddTooltip] = useState(false);
    const toggleAddTooltip = () => setShowAddTooltip(!showAddTooltip);

    /**
     * State handler for details icon
     */
    const [showDetailsTooltip, setShowDetailsTooltip] = useState(false);
    const toggleDetailsTooltip = () => setShowDetailsTooltip(!showDetailsTooltip);

    const messageDetails: string = "Add your education and certification history here";

    useEffect(() => {
        fetch('http://localhost:8081/education')
            .then(response => response.json())
            .then(json => setEducations(json));
    }, [])

    return (
        <div className="container">
            
            <Modal show={showCreationModal} onHide={handleHideCreationModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Education</Modal.Title>
                </Modal.Header>
                <EducationCreation hideModal={handleHideCreationModal}/>
            </Modal>

            <Card id="card-container">
                <Card.Header id="header-project">
                    <h4>
                        Education and Certifications
                        <QuestionCircle id="card-info" />
                        <Tooltip
                            target="card-info"
                            isOpen={showDetailsTooltip}
                            toggle={toggleDetailsTooltip} >
                            {messageDetails}
                        </Tooltip>

                        <PlusCircle id="add-project" onClick={handleShowCreationModal} />
                        <Tooltip
                            target="add-project"
                            isOpen={showAddTooltip}
                            toggle={toggleAddTooltip} >
                            Add Education
                        </Tooltip>
                    </h4>
                </Card.Header>

                <Card.Body>
                    {educations.map((education, index) => (
                        <EducationDisplay currentEducation={education} index={index} key={index} />
                    ))}
                    <Card.Text className="education"></Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EducationContainer;
