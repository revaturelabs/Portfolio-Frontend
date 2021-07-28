import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import "../css/Project.css";
import {url} from "../api/api";
import educationValidation, { educationValidationErrors } from "./validation/EducationValidation";
import styleInvalidElements, { styleInvalidElement } from "./validation/InvalidFormHandling";
import ValidationMsg from './validation/ValidationMsg';

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

const EducationUpdate: FC<{ hideModal: Function, editEducation: Education}>= (props) => {
    const backEndUrl = url + "/education";

    const [id, setId] = useState(props.editEducation.id);
    const [university, setUniversity] = useState(props.editEducation.university);
    const [degree, setDegree] = useState(props.editEducation.degree);
    const [graduationDate, setGraduationDate] = useState(props.editEducation.graduationDate);
    const [gpa, setGpa] = useState(props.editEducation.gpa);
    const [logoUrl, setLogoUrl] = useState(props.editEducation.logoUrl);
    const [validationErrors, setValidationErrors] = useState(Array<string>());

    const handleUpdate= () => {
        const valid = educationValidation(university, degree, graduationDate, gpa);
        const errorElems = educationValidationErrors(university, degree, graduationDate, gpa);

            if(valid){
                axios
                    .post(backEndUrl+"/"+id, {
                        university,
                        degree,
                        graduationDate,
                        gpa,
                        logoUrl
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
            }
            else{
                console.log("INVALID");
                const elements = document.getElementsByClassName("form-input");
                let gpaElement = document.getElementById("gpa");
                console.log(gpaElement)
                if(gpaElement != null) {
                    styleInvalidElement(gpaElement);
                }
                styleInvalidElements(elements);
                setValidationErrors(errorElems);
            }       
    };

    let updateButtonStyles: CSSProperties = {
        background: "rgb(242, 105, 3)",
        borderColor: "rgb(242, 105, 3)"
    }

    return (
        <div>
            <Modal.Body>
                <form method="post">
                    <h6>University Name</h6>
                    <input
                        required
                        type="text"
                        name="university"
                        className="form-input"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                    <br />
                    <h6>Degree Attained</h6>
                    <input
                        required
                        type="text"
                        name="degree"
                        className="form-input"
                        value={degree}
                        onChange={(e) =>
                            setDegree(e.target.value)
                        }
                    />
                    <br />
                    <h6>Graduation Date</h6>
                    <input
                        required
                        type="date"
                        name="graduationDate"
                        className="form-input"
                        value={graduationDate}
                        onChange={(e) =>
                            setGraduationDate(e.target.value)
                        }
                    />
                    <br />
                    <h6>GPA</h6>
                    <input
                        required
                        type="number"
                        name="gpa"
                        className="form-input"
                        value={gpa}
                        onChange={(e) => setGpa(Number(e.target.value))}
                    />
                    <br />
                    <h6 className="logoUrl">URL for University Logo (Optional)</h6>
                    <input
                        type="text"
                        name="logoUrl"
                        className="form-input-optional"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                    />
                </form>

                <ValidationMsg errors={validationErrors}></ValidationMsg>

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
