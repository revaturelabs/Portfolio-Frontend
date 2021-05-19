import axios from "axios";
import React, { useState, FC } from 'react'
import { Button, Modal } from "react-bootstrap";
import "../css/Project.css";

const EducationCreation: FC<{hideModal: Function}>= (props) => {

    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");
    const [graduationDate, setGraduationDate] = useState("");
    const [gpa, setGpa] = useState(0.0);
    const [logoUrl, setLogoUrl] = useState("");

    const handleSave = () => {

        console.log("hello");
        axios
            .post("http://localhost:8081/education", {
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
            });

        props.hideModal();
        //window.location.reload();
    };

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
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                    <br />
                    <h6>Degree Attained</h6>
                    <input
                        required
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
                        required
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
                        required
                        type="number"
                        name="gpa"
                        className="form-input"
                        onChange={(e) => setGpa(Number(e.target.value))}
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
                <Button variant="secondary" onClick={() => props.hideModal()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave()} >
                    Save
                </Button>
            </Modal.Footer>
        </div>
    );
};

export default EducationCreation;
