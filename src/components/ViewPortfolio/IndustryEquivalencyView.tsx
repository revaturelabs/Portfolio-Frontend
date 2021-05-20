import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

interface Equivalency {
    id: number;
    header: string;
    value: number;
}

const IndustryEquivalencyView = () => {
    
    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Industry Equivalency</h4>
                </Card.Header>
                <Card.Body>
                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default IndustryEquivalencyView;