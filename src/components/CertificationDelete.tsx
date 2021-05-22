import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
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

const CertificationDelete: FC<{ hideModal: Function, editCertification: Certification }> = (props) => {
    const backEndUrl = "http://3.236.213.150:8081/certifications";

    const [id, setId] = useState(props.editCertification.id);

    const handleDelete = () => {
        axios
            .delete(backEndUrl + "/" + id)
            .then((response) => {
            })
            .catch((error) => {
                console.log("error");
            })
            .then(() => {
                window.location.reload();
            })
    };

    return (
        <div>
            <Modal.Body><p>This will permanently delete this certification. Are you sure?</p></Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete()}>Yes, Permanently Delete</Button>
                <Button variant="secondary" onClick={() => props.hideModal()}>Close</Button>
            </Modal.Footer>
        </div>
    );
};

export default CertificationDelete;
