import React, { useState, FC, CSSProperties } from 'react'
import { Button, Card } from "react-bootstrap";
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

const EducationDisplay: FC<{ currentEducation: Education, index: number }> = (props) => {

    const [id, setId] = useState(props.currentEducation.id);
    const [university, setUniversity] = useState(props.currentEducation.university);
    const [degree, setDegree] = useState(props.currentEducation.degree);
    const [graduationDate, setGraduationDate] = useState(props.currentEducation.graduationDate);
    const [gpa, setGpa] = useState(props.currentEducation.gpa);
    const [logoUrl, setLogoUrl] = useState(props.currentEducation.logoUrl);

    const cardId = "education" + id;

    const degreeStyles: CSSProperties = {
        display: 'inline'
    };

    const editButtonStyles: CSSProperties = {
        float: 'right',
        display: 'inline',
        marginTop: '0.25em'
    };

    const spanStyles: CSSProperties = {
        display: 'inline-block'
    };

    const gradDateStyles: CSSProperties = {
        color: 'rgb(242, 105, 3)'
    };

    const logoUrlStyles: CSSProperties = {
        float: 'right',
        display: 'inline',
        height: '100px',
        width: '150px'
    };

    return (
        <div>
            <Card className="mb-3" id={cardId}>
                <Card.Header>
                    <h1 style={degreeStyles}>Degree: {degree}</h1>
                    <Button style={editButtonStyles}>Edit</Button>
                </Card.Header>

                <Card.Body>
                    <span style={spanStyles}>
                        <h3>University: {university}</h3>
                        <h5 style={gradDateStyles}>Graduation Date: {graduationDate}</h5>
                        <h5>GPA: {gpa}</h5>
                    </span>
                    {(logoUrl !== "" && logoUrl !== null) && 
                        <img style={logoUrlStyles} src={logoUrl}></img>
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default EducationDisplay;
