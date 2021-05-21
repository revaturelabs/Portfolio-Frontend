import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import "../css/Project.css";

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

const EducationDelete: FC<{ hideModal: Function, editEducation: Education }> = (props) => {
    const backEndUrl = "http://3.236.213.150:8081/education";

    const [id, setId] = useState(props.editEducation.id);

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
            <Modal.Body><p>This will permanantly delete this info. Are you Sure?</p></Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete()}>Yes, Permanantly Delete</Button>
                <Button variant="secondary" onClick={() => props.hideModal()}>Close</Button>
            </Modal.Footer>
        </div>
    );
};

export default EducationDelete;
