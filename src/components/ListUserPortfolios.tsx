import axios from 'axios';
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const ListUserPortfolios = () => {

    const [table, setTable] = useState([])


        axios.get('http://3.236.213.150:8081/portfolios/users/all/{id}')
        .then(response => {
            setTable(response.data)
        })
        .catch(error => {
            console.log(error)
        })


    const showTableBody = () => {
        return table.map((t:any) => 
        <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.name}</td>
            <td>{t.submitted}</td>
            <td>{t.approved}</td>
            <td>{t.feedback}</td>
            <td><Button variant="warning">Delete</Button></td>
        </tr>)
    }

    return (
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
    );
};

export default ListUserPortfolios;