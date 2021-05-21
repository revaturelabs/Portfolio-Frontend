import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Collapse, Modal, Table } from 'react-bootstrap';
import CreatePortfolio from './CreatePortfolio';
import { useCookies } from 'react-cookie'
import axios from 'axios';



const PortfolioList = () => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [cookies, removeCookie] = useCookies()
    const [open, setOpen] = useState(false)
    const [table, setTable] = useState([])

    const handleTable = () => {
        axios.get('http://3.236.213.150:8081/portfolios/users/all/' + cookies['user'].id)
            .then(response => {
                setTable(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleDelete = (id: any) => {
        axios.delete('http://3.236.213.150:8081/portfolios/' + id)
        .then(response => {
            removeCookie('portfolio', cookies['portfolio'], {maxAge: 0})
            alert('portfolio deleted')
            window.location.reload()
        })
        .catch(error => {
            alert(error)
        })
    }

    const showTableBody = () => {
        return table.map((t: any) =>
            <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.submitted}</td>
                <td>{t.approved}</td>
                <td>{t.feedback}</td>
                <td><Button variant="warning" onClick={() => handleDelete(t.id)}>Delete</Button></td>
            </tr>)
    }

    let h1Tag = (<h1>Portfolio List</h1>)
    let callModal = (<Button variant="primary" disabled>Create new Portfolio</Button>)
    let callTable = (<Button variant="primary" disabled>Show List</Button>)

    if (cookies['user']) {
        h1Tag = (<h1>Portfolio List for {cookies['user'].fname} {cookies['user'].lname}</h1>)
        callModal = (<button onClick={handleShow} className="btn btn-primary">Create new Portfolio</button>)
        callTable = (<Button variant="primary" onClick={() => {setOpen(!open); handleTable()}} aria-controls="showList" aria-expanded={open} >Show List</Button>)
    }

    return (
        <div className="container mt-5">
            {h1Tag}
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
            {callModal}
            <div className="mt-5">
                <h5>List of Portfolios</h5>
                {callTable}
                <Collapse in={open}>
                    <div className="mt-5" id="showList">
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Portfolio Name</th>
                                        <th>Submited</th>
                                        <th>Approved</th>
                                        <th>Feedback</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showTableBody()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default PortfolioList;