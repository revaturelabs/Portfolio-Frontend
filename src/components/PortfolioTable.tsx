import axios from "axios";
import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { portfolioUrl } from "../api/api";

function PortfolioTable(props: any) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [sortConfig, setSortConfig]: any = useState("approved");
  const [directionArrows, setDirections] = useState( {
    name:"—",
    submitted:"—",
    approved:"—",
    reviewed:"—"
  });

  let { portfolios } = props;
  let sortedPortfolios = [...portfolios];
  useMemo(() => {
    if (sortConfig !== null) {
      sortedPortfolios.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedPortfolios;
  }, [sortConfig]);

  const requestSort = (key: any) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    if (key === "name" && direction==="descending") {
      setDirections({  name:"⯆",
      submitted:"—",
      approved:"—",
      reviewed:"—"})
    }
    if (key === "name" && direction==="ascending") {
      setDirections({  name:"⯅",
      submitted:"—",
      approved:"—",
      reviewed:"—"})
    }
    if (key === "submitted" && direction==="descending") {
      setDirections({  name:"—",
      submitted:"⯆",
      approved:"—",
      reviewed:"—"})
    }
    if (key === "submitted" && direction==="ascending") {
      setDirections({  name:"—",
      submitted:"⯅",
      approved:"—",
      reviewed:"—"})
    }
    if (key === "approved" && direction==="descending") {
      setDirections({  name:"—",
      submitted:"—",
      approved:"⯆",
      reviewed:"—"})
    }
    if (key === "approved" && direction==="ascending") {
      setDirections({  name:"—",
      submitted:"—",
      approved:"⯅",
      reviewed:"—"})
    }
    if (key === "reviewed" && direction==="descending") {
      setDirections({  name:"—",
      submitted:"—",
      approved:"—",
      reviewed:"⯆"})
    }
    if (key === "reviewed" && direction==="ascending") {
      setDirections({  name:"—",
      submitted:"—",
      approved:"—",
      reviewed:"⯅"})
    }
    setSortConfig({ key, direction });
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


  return (
    <Table style={{margin:"10px"}} striped table-bordered hover>
      <thead>
        <tr>
          <th onClick={() => requestSort("name")}>Portfolio Name {directionArrows.name}</th>
          <th onClick={() => requestSort("submitted")}>Submission Status {directionArrows.submitted}</th>
          <th onClick={() => requestSort("approved")}>Approved Status {directionArrows.approved}</th>
          <th onClick={() => requestSort("reviewed")}>Review Status {directionArrows.reviewed}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedPortfolios.map((portfolio: any) => {
          return (
            <tr key={portfolio.id}  id ="table-rows">
              <td>{portfolio.name}</td>
              <td>{portfolio.submitted ? "Submitted" : "Pending"}</td>
              <td>{portfolio.approved ? "Approved" : "Rejected"}</td>
              <td>
                {portfolio.reviewed ? "Reviewed" : "Not Reviewed"}
              </td>
              <td>
                {" "}
                <button
                  className='btn btn-primary'
                  id = {portfolio.submitted && !portfolio.approved ? "admin-button" : "admin-button2"}
                  onClick={() => renderviewdetail(portfolio.id)}
                >
                  {portfolio.submitted  ? "Flag Portfolio" : "View Portfolio"}
                </button>{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default PortfolioTable;
