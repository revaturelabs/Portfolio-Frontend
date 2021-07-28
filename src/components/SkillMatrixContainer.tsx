import { useState, FC, useEffect } from "react";
import { matrixUrl } from "../api/api";
import { useCookies } from "react-cookie";
import Matrix, { Skill } from "../interfaces/Matrix";
import axios from "axios";
import { Card } from "react-bootstrap";
import createChart from "./SkillMatrixPieChart";

const SkillMatrixContainer = () => {
  // STATE VARIABLES

  /* ---------------------------------------------------------------- */
  // TOOLTIP STATES
  /* ---------------------------------------------------------------- */
  const [addTooltipOpen, setAddTooltipOpen] = useState<boolean>(false);
  const [editTooltipOpen, setEditTooltipOpen] = useState<boolean>(false);
  const [detailsTooltipOpen, setDetailsTooltipOpen] = useState<boolean>(false);
  /* ---------------------------------------------------------------- */
  // MODAL STATES
  /* ---------------------------------------------------------------- */
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState(false);
  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);
  /* ---------------------------------------------------------------- */
  // SKILL MATRIX STATES
  /* ---------------------------------------------------------------- */
  const [matrices, setMatrices] = useState<Array<Matrix>>([]);
  const [maxSkills, setMaxSkills] = useState<number>(0);
  /* ---------------------------------------------------------------- */
  // COOKIE STATES
  /* ---------------------------------------------------------------- */
  const [cookies] = useCookies();
  const portfolio = cookies["portfolio"];
  /* ---------------------------------------------------------------- */
  // ADD SKILL STATES
  /* ---------------------------------------------------------------- */
  const [matrixName, setMatrixName] = useState<string>("");
  const [previousMatrix, setPreviousMatrix] = useState<string>("0");
  const [currentMatrix, setCurrentMatrix] = useState<string>("0");
  const [matrix, setMatrix] = useState<number>(0);
  /* ---------------------------------------------------------------- */

  // TOOLTIP FUNCTIONS

  /* ---------------------------------------------------------------- */
  const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen);
  const toggleEdit = () => setEditTooltipOpen(!editTooltipOpen);
  const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen);
  /* ---------------------------------------------------------------- */

  // MODAL FUNCTIONS

  /* ---------------------------------------------------------------- */
  // ADD MODAL SHOW/CLOSE
  /* ---------------------------------------------------------------- */
  const handleAddShow = () => {
    if (matrices.length >= 6) {
      alert(
        "No more than 6 Matrices can be added to the Skill Matrix Section."
      );
      return;
    }
    setShowAdd(true);
  };
  const handleAddClose = () => {
    setShowAdd(false);
  };
  /* ---------------------------------------------------------------- */
  // EDIT MODAL SHOW/CLOSE
  /* ---------------------------------------------------------------- */
  const handleEditShow = () => {
    setShowEdit(true);
  };
  const handleEditClose = () => {
    getMatrices();
    setShowEdit(false);
  };
  /* ---------------------------------------------------------------- */

  // AXIOS FUNCTIONS

  /* ---------------------------------------------------------------- */
  // GET SKILL MATRIX ARRAY
  /* ---------------------------------------------------------------- */
  const getMatrices = () => {
    axios
      .get(`${matrixUrl}/portfolio/${portfolio.id}`)
      .then((response) => setMatrices(response.data))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMatrices();
  }, []);

  const htmlText = matrices.map(s => <h1>{s.id}</h1>)

  const renderSkillMatrix = (matrices: Matrix[]) => {
    return matrices.map(data => {
      return (
        <>
         {createChart(data)}
        </> 
      );
    });
  }

  return (
    <>
      <div className="container">
        <Card id="card-container">
          <Card.Header id="header">
            <h4>Skill Matrix</h4>
          </Card.Header>
          <Card.Body id="industry">
            {matrices && renderSkillMatrix(matrices)}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SkillMatrixContainer;
