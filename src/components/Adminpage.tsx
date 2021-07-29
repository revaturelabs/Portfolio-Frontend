import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { portfolioUrl } from "../api/api";
import "../css/HonorAwards.css";
import ScrollButton from './ScrollButton';

const Adminpage = () => {
  // state variable for all portfolios
  const [portfolios, setPortfolios] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  // let ButtonStyles: CSSProperties = {
  //   background: "rgb(72, 76, 86)",
  //   borderColor: "rgb(72, 76, 86)",
  //   color: "white",
  // };

  // function to display all portfolios that store in state variable "portfolios"
  const renderportfolio = (p: any, index: number) => {
    //create a query string for url
    const portid = "/Portfoliodetails?id=" + p.id;
    //return jsx
    return (
      <tr id="table-rows">
        <td>{p.name}</td>
        <td>{p.submitted ? "Submitted" : "Pending"}</td>
        <td>{p.approved ? "Approved" : "Rejected"}</td>
        <td>{p.reviewed ? "Review Completed" : "Yet to be reviewed"}</td>
        <td>
          {" "}
          <button
            className="btn btn-primary"
            id = {p.submitted ? "admin-button" : "admin-button2"}
            onClick={() => renderviewdetail(p.id)}
          >
            {p.submitted ? "Flag Portfolio" : "View Portfolio"}
          </button>{" "}
        </td>
      </tr>
    );
  };

  const renderviewdetail = (id: any): void => {
    let pathname = "./view";
    axios
      .get(`${portfolioUrl}/${id}`)
      .then((response) => {
        setCookie("portfolio", response.data, { path: "/" });
        window.location.pathname = pathname;
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLogOut = () => {
    removeCookie("user", { maxAge: 0 });
    removeCookie("admin");
    if (cookies["portfolio"]) {
      removeCookie("portfolio", { maxAge: 0 });
    }
    window.location.pathname = "./";
  };

  // function to fetch all portfolios from back end using axios

  const getData = async () => {
    axios.get(portfolioUrl).then((response) => {
      setPortfolios(response.data);
      console.log(response.data);
    });
  };

  // this will be call every time setState() is called
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      
      <Container>
        <br/>
       <div style={{textAlign:"right", margin:"10px -20px -40px -10px"}}>
           <Button id="admin-button"  onClick={() => handleLogOut()}>
            Logout
          </Button>
       </div>
        
        
        <h1>Welcome Back, {cookies.admin.fname}</h1>
        <Row>
          <Table striped table-bordered hover style={{margin:"10px"}}>
            <thead>
              <tr>
                <th>Portfolio Name</th>
                <th>Submitted/Pending</th>
                <th>Approved/Rejected </th>
                <th>Review Status </th>
                <th></th>
              </tr>
            </thead>
            <tbody>{portfolios.map(renderportfolio)}</tbody>
          </Table>
        </Row>
      </Container>
      <ScrollButton />
    </div>
  );
};

export default Adminpage;
