import axios from "axios";
import React, { useState, FC } from 'react'
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

const EducationUpdate: FC<{ hideModal: Function, editEducation: Education}>= (props) => {
    const backEndUrl = "http://3.236.213.150:8081/education";

    const [id, setId] = useState(props.editEducation.id);
    const [university, setUniversity] = useState(props.editEducation.university);
    const [degree, setDegree] = useState(props.editEducation.degree);
    const [graduationDate, setGraduationDate] = useState(props.editEducation.graduationDate);
    const [gpa, setGpa] = useState(props.editEducation.gpa);
    const [logoUrl, setLogoUrl] = useState(props.editEducation.logoUrl);

    const handleUpdate= () => {

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
    };

    let dateForPrePop = graduationDate.substring(6)+"-"+graduationDate.substring(0,2)+"-"+graduationDate.substring(3,5);

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
                        value={dateForPrePop}
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
                    <h6>URL for University Logo</h6>
                    <input
                        type="text"
                        name="logoUrl"
                        className="form-input"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hideModal()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleUpdate()} >
                    Save
                </Button>
            </Modal.Footer>
        </div>
    );
};

export default EducationUpdate;
