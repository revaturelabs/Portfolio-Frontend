import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import '../css/OtherWorkExperience.css'

interface OtherWorkExperience {
    id: number;
    description: String;
    employer: String;
    date: String;
    technologies: String;
    responsibilities: String;
    title: String;
}
/*****
 * Currently the data objects sent from backend for revature work experience 
 * and other work experience are not the same. Once they have been changed on the backend
 * to be the same. They can use the same component and just pass in a url for the different
 * endpoints
 * *****/
const OtherWorkExperienceView = () => {
    const [experienceList,setList] = useState<OtherWorkExperience[]>();

    useEffect(() => {
        axios.get<OtherWorkExperience[]>('http://3.236.213.150:8081/workhistory').then(response => {
            console.log(response.data);
            setList(response.data)
        })
    }, [null]);

    const renderOtherWorkExperience = (experienceList: OtherWorkExperience[]) =>{
        return experienceList.map(data => {
            return(
                <div className="card">
                    <div className="card-header">
                        {data.employer}
                    </div>
                    <div>
                        {data.title}<br/>
                        {data.description}<br/>
                        {data.date}<br/>
                        {data.responsibilities}<br/>
                        {data.technologies}<br/>
                    </div>
                </div>
            );
        })
    }

    return(
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Other Work Experience</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {experienceList && renderOtherWorkExperience(experienceList)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OtherWorkExperienceView;