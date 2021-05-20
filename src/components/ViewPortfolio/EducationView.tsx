import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

interface Education {
    id: number;
    university: string;
    degree: string;
    graduationDate: string;
    gpa: number;
    logoUrl: string;
}

const EducationView = () => {
    const [educationList, setList] = useState<Education[]>();

    useEffect(() => {
        axios.get('http://3.236.213.150:8081/education').then( response => {
            console.log(response.data);
            setList(response.data);
        });
    }, [null]);

    const renderIndustryEquivalency = () => {
        return educationList?.map(date => {
            <div className="card">
                <div>

                </div>
            </div>
        });
    }

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Education</h4>
                </Card.Header>
                <Card.Body>
                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default EducationView;