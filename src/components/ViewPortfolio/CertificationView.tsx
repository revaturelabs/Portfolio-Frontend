import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import '../../css/ViewPortfolio.css';
import { useCookies } from 'react-cookie'

const CertificationView = () => {
    const [certifications, setCertifications] = useState();


    return(
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Certification</h4>
                </Card.Header>
                <Card.Body>
                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default CertificationView;