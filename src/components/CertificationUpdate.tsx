import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import "../css/Certification.css";
import {url} from "../api/api";

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

const EducationUpdate: FC<{ hideModal: Function, editCertification: Certification }> = (props) => {
    const backEndUrl = url + "/certifications";

    const [id, setId] = useState(props.editCertification.id);
    const [name, setName] = useState(props.editCertification.name);
    const [certId, setCertId] = useState(props.editCertification.certId);
    const [issuedBy, setIssuedBy] = useState(props.editCertification.issuedBy);
    const [issuedOn, setIssuedOn] = useState(props.editCertification.issuedOn);
    const [publicUrl, setPublicUrl] = useState(props.editCertification.publicUrl);

    const handleUpdate = () => {

        axios
            .post(backEndUrl + "/" + id, {
                name,
                certId,
                issuedBy,
                issuedOn,
                publicUrl
            })
            .then((response) => {
            })
            .catch((error) => {
                console.log("error");
            })
            .then(() => {
                props.hideModal();
                window.location.reload();
            })
    };

    let updateButtonStyles: CSSProperties = {
        background: "rgb(242, 105, 3)",
        borderColor: "rgb(242, 105, 3)"
    }

    return (
        <div>
            <Modal.Body>
                <form method="post">
                    <h6>Name of Certification</h6>
                    <input
                        required
                        type="text"
                        name="name"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <h6>Certification ID</h6>
                    <input
                        required
                        type="text"
                        name="certId"
                        className="form-input"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                    />
                    <br />
                    <h6>Organization Issued By</h6>
                    <input
                        required
                        type="text"
                        name="issuedBy"
                        className="form-input"
                        value={issuedBy}
                        onChange={(e) => setIssuedBy(e.target.value)}
                    />
                    <br />
                    <h6>Date Issued On</h6>
                    <input
                        required
                        type="date"
                        name="issuedOn"
                        className="form-input"
                        value={issuedOn}
                        onChange={(e) => setIssuedOn(e.target.value)}
                    />
                    <br />
                    <h6 className="publicUrl">URL for Certification Logo (Optional)</h6>
                    <input
                        type="text"
                        name="publicUrl"
                        className="form-input"
                        value={publicUrl}
                        onChange={(e) => setPublicUrl(e.target.value)}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hideModal()}>
                    Close
                </Button>
                <Button variant="primary" style={updateButtonStyles} onClick={() => handleUpdate()} >
                    Update
                </Button>
            </Modal.Footer>
        </div>
    );
};

export default EducationUpdate;
