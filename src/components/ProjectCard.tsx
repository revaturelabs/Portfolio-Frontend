import React from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import "./ProjectCard.css"

function ProjectCard() {

    var md2json = require('md-2-json');
    console.log(md2json.parse('This is markdown content'));

    return (
        <div>
            <Card className="card">
                <div className="row">
                    <Card.Header className="cardHeader"><h2>Projects</h2></Card.Header>
                </div>
                <Card.Body className="cardBody">
                    <Card.Title className="cardTitle">
                        <h3>[Project Name goes here]</h3></Card.Title>
                        <p>[Project Description goes here]</p>
                    <Card.Text>
                        <h4>[Sub-Component goes here] <button>Edit Button</button></h4>
                        <p>[Sub-Component Content goes here]</p>
                        <h4>[Sub-Component goes here] <button>Edit Button</button></h4>
                        <p>[Sub-Component Content goes here]</p>
                    </Card.Text>
                    <div className="footerButtons">
                        <Button style={{margin:"0.5em"}}>Add New Project</Button>
                        <Button style={{margin:"0.5em"}}>Remove Project</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProjectCard
