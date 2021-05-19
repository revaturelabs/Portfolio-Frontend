import axios from "axios";
import { setgid } from "process";
import React, { useState, useEffect } from 'react'
import "../css/Project.css";
import EducationDisplay from "./EducationDisplay";

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
    const [educations, setEducations] = useState(Array<Education>());

    useEffect(() => {
        fetch('http://localhost:8081/education')
        .then(response => response.json())
        .then(json => setEducations(json));
    }, [])

    return (
        <div className="container">
            {educations.map((education, index) => (
                <EducationDisplay currentEducation={education} key={index}/>
            ))}
        </div>
    );
};

export default EducationContainer;
