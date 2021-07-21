import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Collapse, Modal, Table } from 'react-bootstrap';
import CreatePortfolio from './CreatePortfolio';
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { url } from '../api/api';



const PortfolioList = () => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [cookies, setCookie, removeCookie] = useCookies()
    const [open, setOpen] = useState(false)
    const [table, setTable] = useState([])

    const handleTable = () => {
        axios.get(url + '/portfolios/users/all/' + cookies['user'].id)
            .then(response => {
                setTable(response.data)
                console.log(table);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleDelete = (id: any) => {
        axios.delete(url +'/portfolios/' + id)
            .then(response => {
                removeCookie('portfolio', { maxAge: 0 })
                alert('portfolio deleted')
                window.location.reload()
            })
            .catch(error => {
                alert(error)
            })
    }

    const handleLogOut = () => {
        removeCookie('user', { maxAge: 0 })
        if (cookies['portfolio']) {
            removeCookie('portfolio', { maxAge: 0 })
        }
        window.location.pathname = "./"
    }

    const handlePortfolioEdit = (id: any, submitted: boolean) => {
        let pathname = submitted ? "./view" : "./portfolio";
        axios.get(url + '/portfolios/' + id)
            .then(response => {
                setCookie('portfolio', response.data, { path: "/" });
                window.location.pathname = pathname;
            })
            .catch(error => {
                alert(error)
            })
    }

    const showTableBody = () => {
        return table.map((t: any) => {
            return (
                <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.submitted}</td>
                    <td>{t.approved}</td>
                    <td>{t.feedback}</td>
                    <td><Button variant="danger" onClick={() => handleDelete(t.id)}>Delete</Button></td>
                    <td><Button variant="primary" onClick={() => handlePortfolioEdit(t.id, t.submitted)}>{t.submitted ? "View" : "Edit"}</Button></td>
                </tr>
            )
        })
    }

    let h1Tag = (<h1>Portfolio List</h1>)
    let callModal = (<Button variant="primary" disabled>Create new Portfolio</Button>)
    let callTable = (<Button variant="primary" disabled>Show List</Button>)
    let logout = (<Button variant="primary" className="ms-2" disabled>Log out</Button>)

    if (cookies['user']) {
        h1Tag = (<h1>Portfolio List for {cookies['user'].fname} {cookies['user'].lname}</h1>)
        callModal = (<button onClick={handleShow} className="btn btn-primary">Create new Portfolio</button>)
        callTable = (<Button variant="primary" onClick={() => { setOpen(!open); handleTable() }} aria-controls="showList" aria-expanded={open} >Show List</Button>)
        logout = (<Button variant="primary" className="ms-2" onClick={() => handleLogOut()} >Log out</Button>)
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
            {logout}
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
                                        <th>Submitted</th>
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