import axios from "axios";
import React, { useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { portfolioUrl } from "../api/api";

function PortfolioListTable(props: any) {
  let { portfolios } = props;
  const [, setCookie, removeCookie] = useCookies();
  const [sortConfig, setSortConfig]: any = useState("approved");
  let sortedPortfolios = [...portfolios];
  console.log(portfolios);

  const defaultArrows = {
    id: "—",
    name: "—",
    submitted: "—",
    approved: "—",
    reviewed: "—",
  };
  const [directionArrows, setDirections] = useState(defaultArrows);

  useMemo(() => {
    if (sortConfig !== null) {
      sortedPortfolios.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedPortfolios;
  }, [sortedPortfolios, sortConfig]);

  const requestSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    if (key === "id" && direction === "desc") {
      setDirections({ ...defaultArrows, id: "⯆" });
    }
    if (key === "id" && direction === "asc") {
      setDirections({ ...defaultArrows, id: "⯅" });
    }
    if (key === "name" && direction === "desc") {
      setDirections({ ...defaultArrows, name: "⯆" });
    }
    if (key === "name" && direction === "asc") {
      setDirections({ ...defaultArrows, name: "⯅" });
    }
    if (key === "submitted" && direction === "desc") {
      setDirections({ ...defaultArrows, submitted: "⯆" });
    }
    if (key === "submitted" && direction === "asc") {
      setDirections({ ...defaultArrows, submitted: "⯅" });
    }
    if (key === "approved" && direction === "desc") {
      setDirections({ ...defaultArrows, approved: "⯆" });
    }
    if (key === "approved" && direction === "asc") {
      setDirections({ ...defaultArrows, approved: "⯅" });
    }
    if (key === "reviewed" && direction === "desc") {
      setDirections({ ...defaultArrows, reviewed: "⯆" });
    }
    if (key === "reviewed" && direction === "asc") {
      setDirections({ ...defaultArrows, reviewed: "⯅" });
    }
    setSortConfig({ key, direction });
  };

  const handlePortfolioEdit = (id: any, submitted: boolean) => {
    let pathname = submitted ? "./view" : "./portfolio";
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

  const handleDelete = (id: any) => {
    axios
      .delete(`${portfolioUrl}/${id}`)
      .then((response) => {
        removeCookie("portfolio", { maxAge: 0 });
        toast.success("Portfolio deleted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Table style={{ margin: "10px" }} striped table-bordered hover>
      <thead>
        <tr>
          <th onClick={() => requestSort("id")}># {directionArrows.id}</th>
          <th onClick={() => requestSort("name")}>
            Portfolio Name {directionArrows.name}{" "}
          </th>
          <th onClick={() => requestSort("submitted")}>
            Submitted {directionArrows.submitted}
          </th>
          <th onClick={() => requestSort("reviewed")}>
            Reviewed {directionArrows.reviewed}
          </th>
          <th onClick={() => requestSort("approved")}>
            Approved {directionArrows.approved}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedPortfolios.map((portfolio: any) => {
          return (
            <tr key={portfolio.id} id='table-rows'>
              <td>{portfolio.id}</td>
              <td>{portfolio.name}</td>
              <td>{portfolio.submitted ? "Submitted" : "Pending"}</td>
              <td>
                {portfolio.reviewed ? "Review Completed" : "Not Reviewed"}
              </td>
              <td>{portfolio.approved ? "Approved" : "Rejected"}</td>

              <td>
                <Button
                  variant='danger'
                  style={{ marginRight: "10px" }}
                  onClick={() => handleDelete(portfolio.id)}
                >
                  Delete
                </Button>
                <Button
                  variant='primary'
                  onClick={() =>
                    handlePortfolioEdit(portfolio.id, portfolio.submitted)
                  }
                >
                  {portfolio.submitted ? "View" : "Edit"}
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default PortfolioListTable;
