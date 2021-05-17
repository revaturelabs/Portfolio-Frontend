import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import '../css/RevatureWorkExperience.css';

interface WorkExperience {
    id: number;
    description: String;
    employer: String;
    startDate: String;
    endDate: String;
    technologies: String;
    responsibilities: String;
    title: String;
}

const RevatureWorkExperienceView = () => {
    const [experienceList,setList] = useState<WorkExperience[]>();

    /*****Gets the work experience data and sets it to the state*****/
    useEffect(() => {
        axios.get<WorkExperience[]>('http://3.236.213.150:8081/workexperience').then(response => {
            console.log(response.data);
            setList(response.data);
        });
    }, [null]);

    /*****Iterates through the work experience list to display*****/
    const renderWorkExperience = (experienceList: WorkExperience[]) => {
        return experienceList.map(data => {
            // console.log(data);
            return (
                <div className="card">
                    <div className="card-header">
                        {data.employer}
                    </div>    
                    <div className="card-body">
                        {data.title}<br/>
                        {data.description}<br/>
                        {data.startDate} - {data.endDate}<br/>
                        {data.responsibilities}<br/>
                        {data.technologies}<br/>

                    </div>
                </div>
            );
        })
    }

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Work Experience</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Text className="work-experience">
                        {experienceList && renderWorkExperience(experienceList)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default RevatureWorkExperienceView;