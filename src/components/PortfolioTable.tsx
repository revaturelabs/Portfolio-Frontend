import React, { useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { portfolioUrl } from "../api/api";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";

function PortfolioTable(props: any) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [sortConfig, setSortConfig]: any = useState("");
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
    <Table striped table-bordered hover>
      <thead>
        <tr>
          <th onClick={() => requestSort("name")}>Portfolio Name</th>
          <th onClick={() => requestSort("submitted")}>Submitted/Pending</th>
          <th onClick={() => requestSort("approved")}>Approved/Rejected </th>
          <th onClick={() => requestSort("reviewed")}>Review Status </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedPortfolios.map((portfolio: any) => {
          return (
            <tr key={portfolio.id}>
              <td>{portfolio.name}</td>
              <td>{portfolio.submitted ? "Submitted" : "Pending"}</td>
              <td>{portfolio.approved ? "Approved" : "Rejected"}</td>
              <td>
                {portfolio.reviewed ? "Review Completed" : "Yet to be reviewed"}
              </td>
              <td>
                {" "}
                <button
                  className='btn btn-primary'
                  onClick={() => renderviewdetail(portfolio.id)}
                >
                  Flag Portfolio
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
