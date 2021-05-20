import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Collapse, Modal } from 'react-bootstrap';
import CreatePortfolio from './CreatePortfolio';
import ListUserPortfolios from './ListUserPortfolios';


const PortfolioList = () => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [open, setOpen] = useState(false)

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
            <div className="mt-5">
                <h5>List of Portfolios</h5>
                <Button variant="primary" onClick={() => setOpen(!open)} aria-controls="showList" aria-expanded={open} >Show List</Button>
                <Collapse in={open}>
                    <div className="mt-5" id="showList">
                        <ListUserPortfolios />
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default PortfolioList;