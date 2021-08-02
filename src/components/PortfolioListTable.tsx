import axios from "axios";
import React, { useMemo, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { portfolioUrl } from "../api/api";

export const defaultArrows:{[key: string]: string} = {
  id: "—",
  name: "—",
  submitted: "—",
  approved: "—",
  reviewed: "—",
};

function PortfolioListTable(props: any) {
  let { portfolios } = props;
  const [, setCookie, removeCookie] = useCookies();
  const [sortConfig, setSortConfig]: any = useState("approved");
  let sortedPortfolios = [...portfolios];
  console.log(portfolios);

  const [directionArrows, setDirections] = useState(defaultArrows);

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
  }, [sortedPortfolios]);

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
        props.handleTable();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Table style={{ margin: "10px" }} striped table-bordered hover>
      <thead>
        <tr>
          <th
            onClick={() =>
              requestSort("id", sortConfig, setDirections, setSortConfig)
            }
          >
            # {directionArrows.id}
          </th>
          <th
            onClick={() =>
              requestSort("name", sortConfig, setDirections, setSortConfig)
            }
          >
            Portfolio Name {directionArrows.name}{" "}
          </th>
          <th
            onClick={() =>
              requestSort("submitted", sortConfig, setDirections, setSortConfig)
            }
          >
            Submitted {directionArrows.submitted}
          </th>
          <th
            onClick={() =>
              requestSort("reviewed", sortConfig, setDirections, setSortConfig)
            }
          >
            Reviewed {directionArrows.reviewed}
          </th>
          <th
            onClick={() =>
              requestSort("approved", sortConfig, setDirections, setSortConfig)
            }
          >
            Approved {directionArrows.approved}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedPortfolios.map((portfolio: any) => {
          return (
            <tr key={portfolio.id} id="table-rows">
              <td>{portfolio.id}</td>
              <td>{portfolio.name}</td>
              <td>{portfolio.submitted ? "Submitted" : "Pending"}</td>
              <td>
                {portfolio.reviewed ? "Review Completed" : "Not Reviewed"}
              </td>
              <td>{portfolio.approved ? "Approved" : "Rejected"}</td>

              <td>
                <Button
                  variant="danger"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleDelete(portfolio.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
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

export function requestSort(
  key: string,
  sortConfig: any,
  setDirections: any,
  setSortConfig: any
) {
  let direction = "ascending";
  if (sortConfig.key === key && sortConfig.direction === "ascending") {
    direction = "descending";
  }
  let newArrows = {...defaultArrows};
  if (direction==="descending") {
    newArrows[key] = "⯆";
  } else if (direction === "ascending") {
    newArrows[key] = "⯅";
  }
  setDirections(newArrows);
  setSortConfig({ key, direction });
}

export default PortfolioListTable;
