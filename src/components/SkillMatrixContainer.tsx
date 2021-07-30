import { useState, FC, useEffect } from "react";
import { matrixUrl } from "../api/api";
import { useCookies } from "react-cookie";
import Matrix, { Skill } from "../interfaces/Matrix";
import axios from "axios";
import { Card } from "react-bootstrap";
import createChart from "./SkillMatrixPieChart";
import { Modal, Button, ModalBody } from "react-bootstrap";
import { Tooltip } from 'reactstrap';
import { QuestionCircle, PlusCircle, Pencil, XCircle } from 'react-bootstrap-icons';

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
  const [showDetailMatrix, setShowDetailsMatrix] = useState(false);
  const handleCloseDetails = () => setShowDetailsMatrix(false);
  const [detailsModalMatrix, setDetailModalMatrix] = useState({ header: ""});
  
  const handleShowDetailsMatrix = (matrix: Matrix) =>{ 
    setShowDetailsMatrix(true);
    setDetailModalMatrix(matrix);
  };

  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () =>{ setShowDetails(true) };
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

  
    /* ---------------------------------------------------------------- */
    // ADD EQUIVALENCY Matrix
    /* ---------------------------------------------------------------- */
    const addMatrix = (async () => {
      let newMatrix: Matrix = {
          id: 0,
          header: matrixName,
          portfolio: portfolio,
          skills: []
      }
      axios.post(matrixUrl, newMatrix)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              let tempMatrixSet: Array<Matrix> = [...matrices];
              tempMatrixSet.push(resp.data);
              setMatrices(tempMatrixSet);
          })
          .catch(error => {
              console.error(error);
          });
      setShowAdd(false);
      setMatrixName('');
  });
  /* ---------------------------------------------------------------- */

  
    /* ---------------------------------------------------------------- */
    // ADD Update Matrix
    /* ---------------------------------------------------------------- */
    /*const updateMatrix = (async (matrix: Matrix) => {
      axios.post(`${matrixUrl}/${matrix.}`)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              let tempMatrixSet: Array<Matrix> = [...matrices];
              tempMatrixSet.push(resp.data);
              setMatrices(tempMatrixSet);
          })
          .catch(error => {
              console.error(error);
          });
      setShowAdd(false);
      setMatrixName('');
  });*/
  /* ---------------------------------------------------------------- */

  const renderSkillMatrix = (matrices: Matrix[]) => {
    return matrices.map(data => {
      return (
        <div key={data.id} className="container">
         {createChart(data)}
         <Card>
          <Card.Header>
            <h4>
              {data.header}
              <QuestionCircle id={data.header} onClick={() => handleShowDetailsMatrix(data)} />
            </h4>
          </Card.Header>
          
           <Card.Body>
             <ul>
                {data.skills.map(s => <li>{s}</li> )} 
             </ul>
          </Card.Body>
         </Card>             
        </div> 
      );
    });
  }

  return (
    <>
      <div className="container">
        <Card id="card-container">
          <Card.Header id="header">
            <h4>
              Skill Matrix
              <QuestionCircle id="card-info" onClick={handleShowDetails} />
              <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
              <PlusCircle id="add-equivalency" onClick={handleAddShow} style={{marginRight: "10px"}} />
              <Tooltip target="add-equivalency" isOpen={addTooltipOpen} toggle={toggleAdd}>Add Industry Equivalency</Tooltip>
            </h4>
          </Card.Header>
          <Modal show={showAdd} onHide={handleAddClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add a Skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="skillTitle"><h6>Skill Title</h6></label>
                                <input
                                    className="form-control"
                                    name="skillTitle"
                                    value={matrixName}
                                    onChange={(ev) => { setMatrixName(ev.target.value); }}>
                                </input>
                            </div>
                            <br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddClose}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={addMatrix}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDetails} onHide={handleCloseDetails}>
                    <Modal.Header>
                        <Modal.Title>Details</Modal.Title>
                        <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                    </Modal.Header>
                    <ModalBody>
                        <p>
                            Add your <b>top 5 key skills</b> and the equivalency in months for each skill.  
                        </p>
                    </ModalBody>
                </Modal>
                <Modal show={showDetailMatrix} onHide={handleCloseDetails}>
              <Modal.Header>
                  <Modal.Title>Details</Modal.Title>
              </Modal.Header>
              <ModalBody>
                  <p>
                    Edit <b>{detailsModalMatrix.header}</b>
                  </p>
              </ModalBody>
            </Modal>
          <Card.Body id="industry">
            {matrices && renderSkillMatrix(matrices)}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SkillMatrixContainer;
