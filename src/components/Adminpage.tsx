import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import "../css/HonorAwards.css";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";
import { useCookies } from "react-cookie";
import { portfolioUrl } from "../api/api";

const Adminpage = () => {
  // state variable for all portfolios
  const [portfolios, setPortfolios] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  let ButtonStyles: CSSProperties = {
    background: "rgb(72, 76, 86)",
    borderColor: "rgb(72, 76, 86)",
    color: "white",
  };

  let LogOutButton: CSSProperties = {
    background: "rgb(242, 105, 38)",
    borderColor: "rgb(7242, 105, 38)",
    color: "white",
    fontWeight: "bold"
  };

  // function to display all portfolios that store in state variable "portfolios"
  const renderportfolio = (p: any, index: number) => {
    //create a query string for url
    const portid = "/Portfoliodetails?id=" + p.id;
    //return jsx
    return (
      <tr>
        <td>{p.name}</td>
        <td>{p.submitted ? "Submitted" : "Pending"}</td>
        <td>{p.approved ? "Approved" : "Rejected"}</td>
        <td>{p.reviewed ? "Review Completed" : "Yet to be reviewed"}</td>
        <td>{p.feedback}</td>
        <td>
          <Link className="btn btn-primary" style={ButtonStyles} to={portid}>
            Edit
          </Link>
        </td>
        <td>
          {" "}
          <button
            className="btn btn-primary"
            style={ButtonStyles}
            onClick={() => renderviewdetail(p.id)}
          >
            Flag Portfolio
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
        console.log(portfolioUrl + id);
      })
      .catch((error) => {
        alert(error);
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
        <div className="container mb-1 mt-1" id="editPortfolioButtons">
          <Button style={LogOutButton} onClick={() => handleLogOut()}>
            Logout
          </Button>
        </div>

        <h3> Portfolios </h3>

        <Row>
          <Table striped table-bordered hover>
            <thead>
              <tr>
                <th>Portfolio Name</th>
                <th>Submitted/Pending</th>
                <th>Approved/Rejected </th>
                <th>ReviewStatus </th>
                <th>Feedback</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{portfolios.map(renderportfolio)}</tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default Adminpage;
