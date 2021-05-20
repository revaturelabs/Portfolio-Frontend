import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import '../../css/RevatureWorkExperience.css';

interface WorkExperience {
    id: number;
    description: string;
    employer: string;
    startDate: string;
    endDate: string;
    technologies: string;
    responsibilities: string;
    title: string;
}

type props = {
    url: string,
    title: string,
};
/*****
 * Currently the data objects sent from backend for revature work experience 
 * and other work experience are not the same. Once they have been changed on the backend
 * to be the same. They can use the same component and just pass in a url for the different
 * endpoints
 * *****/
const RevatureWorkExperienceView :React.FC<props> = ({ url, title }) => {
    const [experienceList,setList] = useState<WorkExperience[]>();

    /*****Gets the work experience data and sets it to the state*****/
    useEffect(() => {
        axios.get<WorkExperience[]>(url).then(response => {
        // axios.get<WorkExperience[]>('http://3.236.213.150:8081/workexperience').then(response => {
            console.log(response.data);
            setList(response.data);
        });
    }, [null]);

    /*****Iterates through the work experience list to display*****/
    const renderWorkExperience = (experienceList: WorkExperience[]) => {
        return experienceList.map(data => {
            // console.log(data);
            const startDate = new Date(data.startDate).toLocaleString('default', {month: 'long', year: 'numeric'});
            const endDate = new Date(data.endDate).toLocaleString('default', {month: 'long', year: 'numeric'});
            return (
                <div className="card" key={data.id}>
                    <div className="card-header" style={{ borderBottom: "5px solid rgb(115, 165, 194)", backgroundColor: "white" }}>
                        <h1 style={{ fontWeight: "bold" }}>{data.employer}</h1>
                        <h2>{startDate} - {endDate}</h2>
                        <h3 style={{ color: "rgb(242, 105, 3)" }}>{data.title}</h3>
                    </div>    
                    <div className="card-body">
                        <h5>Project Description</h5>
                        <p>{data.description}</p>
                        <h5>Roles / Responsibilities</h5>
                        <p>{data.responsibilities}</p>
                        <h5>Technologies</h5>
                        <p>{data.technologies}</p>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>{title}</h4>
                </Card.Header>
                <Card.Body>
                    {experienceList && renderWorkExperience(experienceList)}
                </Card.Body>
            </Card>
        </div>
    );
}

export default RevatureWorkExperienceView;