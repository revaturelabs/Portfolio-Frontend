import React, { useState, useEffect } from 'react'
import { Card, Modal } from "react-bootstrap";
import { PlusCircle, QuestionCircle } from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";
import "../css/Project.css";
import Education from './Education';
import EducationCreation from './EducationCreation';
import EducationDisplay from "./EducationDisplay";
import EducationUpdate from './EducationUpdate';

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
    const backEndUrl = "http://3.236.213.150:8081/education";

    const [educations, setEducations] = useState(Array<Education>());
    const [editEducation, setEditEducation] = useState(Object);
    const getEditEducation = (education: Education) => setEditEducation(education);

    const [showCreationModal, setShowCreationModal] = useState(false);
    const handleHideCreationModal = () => setShowCreationModal(false);
    const handleShowCreationModal = () => setShowCreationModal(true);

    const [showEditModal, setShowEditModal] = useState(false);
    const handleHideEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

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
        fetch(backEndUrl)
            .then(response => response.json())
            .then(json => setEducations(json));
    }, [])

    return (
        <div className="container mt-4">
            
            <Modal show={showCreationModal} onHide={handleHideCreationModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add Education</Modal.Title>
                </Modal.Header>
                <EducationCreation hideModal={handleHideCreationModal}/>
            </Modal>

            <Modal show={showEditModal} onHide={handleHideEditModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Edit Education</Modal.Title>
                </Modal.Header>
                <EducationUpdate hideModal={handleHideEditModal} editEducation={editEducation}/>
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
                        <EducationDisplay getEditEducation={getEditEducation} showEditModal={handleShowEditModal} currentEducation={education} index={index} key={index} />
                    ))}
                    <Card.Text className="education"></Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EducationContainer;
