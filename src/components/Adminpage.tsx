import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { portfolioUrl } from "../api/api";
import PortfolioTable from "./PortfolioTable";
import "../css/HonorAwards.css";
import ScrollButton from "./ScrollButton";

const Adminpage = () => {
  // state variable for all portfolios
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  // let ButtonStyles: CSSProperties = {
  //   background: "rgb(72, 76, 86)",
  //   borderColor: "rgb(72, 76, 86)",
  //   color: "white",
  // };

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
        <br />
        <div style={{ textAlign: "right", margin: "10px -20px -40px -10px" }}>
          <Button id='admin-button' onClick={() => handleLogOut()}>
            Logout
          </Button>
        </div>

        <h1>Welcome Back, {cookies.admin.fname}</h1>
        <Row>
          <PortfolioTable portfolios={portfolios} />
        </Row>
      </Container>
      <ScrollButton />
    </div>
  );
};

export default Adminpage;
