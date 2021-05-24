import React, { useState, useEffect } from 'react'
import { Card, Modal } from "react-bootstrap";
import { PlusCircle, QuestionCircle } from "react-bootstrap-icons";
import { useCookies } from 'react-cookie';
import { Tooltip } from "reactstrap";
import CertificationCreation from './CertificationCreation';
import CertificationDelete from './CertificationDelete';
import CertificationDisplay from './CertificationDisplay';
import CertificationUpdate from './CertificationUpdate';
import "../css/Certification.css";

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

interface Certification {
    id: number;
    portfolio: Portfolio;
    name: string;
    certId: string;
    issuedBy: string;
    issuedOn: string;
    publicUrl: string;
}

const CertificationContainer = () => {
    const backEndUrl = "http://3.236.213.150:8081/certifications";
    const [cookies] = useCookies();
    const portfolioId = cookies['portfolio'].id;

    const [certifications, setCertifications] = useState(Array<Certification>());

    //Stores the education that the user wants to edit
    const [editCertification, setEditCertification] = useState(Object);
    const getEditCertification = (certification: Certification) => setEditCertification(certification);

    //State handlers for the creation modal
    const [showCreationModal, setShowCreationModal] = useState(false);
    const handleHideCreationModal = () => setShowCreationModal(false);
    const handleShowCreationModal = () => setShowCreationModal(true);

    //State handlers for the edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const handleHideEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    //State handlers for the delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleHideDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    //State handler for plus icon
    const [showAddTooltip, setShowAddTooltip] = useState(false);
    const toggleAddTooltip = () => setShowAddTooltip(!showAddTooltip);

    //State handler for details icon
    const [showDetailsTooltip, setShowDetailsTooltip] = useState(false);
    const toggleDetailsTooltip = () => setShowDetailsTooltip(!showDetailsTooltip);

    const messageDetails: string = "Add your certifications here";

    useEffect(() => {
        fetch(backEndUrl + "/portfolio/all/" + portfolioId)
            .then(response => response.json())
            .then(json => setCertifications(json));
    }, [])

    return (
        <div className="container mt-4">

            <Modal show={showCreationModal} onHide={handleHideCreationModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add Certification</Modal.Title>
                </Modal.Header>
                <CertificationCreation hideModal={handleHideCreationModal} />
            </Modal>

            <Modal show={showEditModal} onHide={handleHideEditModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Edit Certification</Modal.Title>
                </Modal.Header>
                <CertificationUpdate hideModal={handleHideEditModal} editCertification={editCertification} />
            </Modal>

            <Modal show={showDeleteModal} onHide={handleHideDeleteModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Delete Warning</Modal.Title>
                </Modal.Header>
                <CertificationDelete hideModal={handleHideDeleteModal} editCertification={editCertification} />
            </Modal>

            <Card id="card-container">
                <Card.Header id="header-project">
                    <h4>
                        Certification
                        <QuestionCircle id="card-info-certification" />
                        <Tooltip
                            target="card-info-certification"
                            isOpen={showDetailsTooltip}
                            toggle={toggleDetailsTooltip} >
                            {messageDetails}
                        </Tooltip>

                        <PlusCircle id="add-certification" onClick={handleShowCreationModal} />
                        <Tooltip
                            target="add-certification"
                            isOpen={showAddTooltip}
                            toggle={toggleAddTooltip} >
                            Add Certification
                        </Tooltip>
                    </h4>
                </Card.Header>

                <Card.Body>
                    {certifications.map((certification, index) => (
                        <CertificationDisplay getEditCertification={getEditCertification} showEditModal={handleShowEditModal} 
                        showDeleteModal={handleShowDeleteModal} currentCertification={certification} index={index} key={index} />
                    ))}
                    <Card.Text className="certification"></Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CertificationContainer;
