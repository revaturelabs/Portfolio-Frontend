import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import CreatePortfolio from './CreatePortfolio';


const PortfolioList = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="container mt-5">
            <h1>Portfolio List</h1>
            <Modal show={show} onHide={handleClose} backdrop="static">
                        <Modal.Header>
                            <Modal.Title>Create Portfolio</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreatePortfolio />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
            <button onClick={handleShow} className="btn btn-primary">Create new Portfolio</button>
        </div>
    );
};

export default PortfolioList;