import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import "../css/Project.css";

interface Projects{
    id: number
    description: String
    duration: number
    hours: number
    name: String
    responsibilites: String
}

const ProjectView = () => {
     const [projectList,setProjects] = useState<Projects[]>();

    useEffect(() => {
        axios.get('http://3.236.213.150:8081/projects').then(response => {
            console.log(response.data)
            setProjects(response.data);
        })
    }, [null]);

    const renderProjects = ((projectList: Projects[]) => {
        return projectList.map(data => {
            return(
                <div>

                </div>
            );
        })
    })

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Projects</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Text className="projects">
                        {projectList && renderProjects(projectList)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProjectView;