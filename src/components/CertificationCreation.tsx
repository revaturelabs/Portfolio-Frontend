import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import "../css/Certification.css";
import {url} from "../api/api";
import certificationValidation from "./validation/CertificationValidation";
import styleInvalidElements from "./validation/InvalidFormHandling";
import ValidationMsg from './validation/ValidationMsg'

const CertificationCreation: FC<{ hideModal: Function }> = (props) => {
    const backEndUrl = url + "/certifications";
    const [cookies] = useCookies();
    const portfolio = cookies['portfolio'];

    const [name, setName] = useState("");
    const [certId, setCertId] = useState("");
    const [issuedBy, setIssuedBy] = useState("");
    const [issuedOn, setIssuedOn] = useState("");
    const [publicUrl, setPublicUrl] = useState("");

    //Render Error Messages
    //*****************************************************/
    const [validationErrors, setValidationErrors] =  useState<string[]>([]);
    //*****************************************************/

    const handleSave = () => {
        if (certificationValidation(portfolio, name, certId, issuedBy, issuedOn)){
            axios
                .post(backEndUrl, {
                    portfolio,
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
                });
        }else{
            let inputElements = document.getElementsByClassName("form-input");
            styleInvalidElements(inputElements);
            setValidationErrors(["Please populate the required fields"]);
        }
    };

    let addButtonStyles: CSSProperties = {
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
                        className="form-input-optional"
                        value={publicUrl}
                        onChange={(e) => setPublicUrl(e.target.value)}
                    />
                </form>
                <ValidationMsg errors={validationErrors}></ValidationMsg>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hideModal()}>
                    Close
                </Button>
                <Button variant="primary" style={addButtonStyles} onClick={() => handleSave()} >
                    Add
                </Button>
            </Modal.Footer>
        </div>
    );
};

export default CertificationCreation;
