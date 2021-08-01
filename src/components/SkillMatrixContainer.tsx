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
  const handleCloseDetailsMatrix = () => setShowDetailsMatrix(false);
  const handleCloseDetails = () => setShowDetails(false);
  const [detailsModalMatrix, setDetailModalMatrix] = useState({ header: ""});

  const handleShowDetailsMatrix = (matrix: Matrix) =>{
    setShowDetailsMatrix(true);
    setDetailModalMatrix(matrix);
  };

  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () =>{ setShowDetails(true) };


  /* ---------------------------------------------------------------- */
  // COOKIE STATES
  /* ---------------------------------------------------------------- */
  const [cookies] = useCookies();
  const portfolio = cookies["portfolio"];
  /*-----------------------------------------------------------------*/

  const newMatrix:Matrix = {
    id: 0, header: "", portfolio: portfolio, skills: []
  }

  const [detailsUpdateModalMatrix, setUpdateDetailModalMatrix] = useState(newMatrix);
  const [showUpdateDetailMatrix, setUdpateShowDetailsMatrix] = useState(false);
  const handleUpdateShowDetailsMatrix = (matrix: Matrix) =>{
    setUdpateShowDetailsMatrix(true);
    setUpdateDetailModalMatrix(matrix);
  };

  const handleUpdateShowDetailsMatrixClose = () => {
    setUdpateShowDetailsMatrix(false);
    getMatrices();
  };

  const [deleteMatrixDetail, setDeleteMatrixDetail] = useState(newMatrix);
  const deleteMatrixFunc = (matrix: Matrix) => {
    setDeleteMatrixDetail(matrix)
    getMatrices();
  };

  

  const [updateSkillName1, setUpdateSkillName1] = useState<string>("");
  const [updateSkillValue1, setUpdateSkillValue1] = useState<number>(0);


  const [updateSkillName2, setUpdateSkillName2] = useState<string>("");
  const [updateSkillValue2, setUpdateSkillValue2] = useState<number>(0);


  const [updateSkillName3, setUpdateSkillName3] = useState<string>("");
  const [updateSkillValue3, setUpdateSkillValue3] = useState<number>(0);


  const [updateSkillName4, setUpdateSkillName4] = useState<string>("");
  const [updateSkillValue4, setUpdateSkillValue4] = useState<number>(0);


  const [updateSkillName5, setUpdateSkillName5] = useState<string>("");
  const [updateSkillValue5, setUpdateSkillValue5] = useState<number>(0);


  const [updateSkillName6, setUpdateSkillName6] = useState<string>("");
  const [updateSkillValue6, setUpdateSkillValue6] = useState<number>(0); 

  /* ---------------------------------------------------------------- */
  // SKILL MATRIX STATES
  /* ---------------------------------------------------------------- */
  const [matrices, setMatrices] = useState<Array<Matrix>>([]);
  const [maxSkills, setMaxSkills] = useState<number>(0);

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
              console.log("Add")
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
    const updateMatrix = (async (matrix: Matrix) => {
      axios.put(matrixUrl, matrix)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              console.log("Update")
          })
          .catch(error => {
              console.error(error);
          });
      setShowEdit(false);
      setMatrixName('');
  });
  /* ---------------------------------------------------------------- */

   /* ---------------------------------------------------------------- */
    // ADD Update Matrix
    /* ---------------------------------------------------------------- */
    const deleteMatrix = (async (id: number) => {
      axios.delete(`${matrixUrl}/${id}`)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              console.log("Delete")
              console.log(id)
          })
          .catch(error => {
              console.error(error);
          });
      setShowEdit(false);
      setMatrixName('');
  });
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
              <Pencil onClick={()=>handleUpdateShowDetailsMatrix(data) } />
              <XCircle onClick={() => { deleteMatrix(data.id); window.location.reload(true)}} />
            </h4>
          </Card.Header>

           <Card.Body>
             <ul>
                {data.skills.map(s => <li>{s.name}</li> )}
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
                        <Modal.Title>Add Skill Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="skillTitle"><h6>Skill Category Name</h6></label>
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
                        <Button variant="primary" className="oButton" onClick={() => {addMatrix(); window.location.reload(true);}}>Add</Button>
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
              <Modal show={showDetailMatrix} onHide={handleCloseDetailsMatrix}>
                <Modal.Header>
                    <Modal.Title>Details</Modal.Title>
                    <XCircle id="work-experience-details" onClick={handleCloseDetailsMatrix}/>
                </Modal.Header>
                <ModalBody>
                    <p>
                      Edit <b>{detailsModalMatrix.header}</b>
                    </p>
                </ModalBody>
               </Modal>
            <Modal show={showUpdateDetailMatrix} onHide={handleUpdateShowDetailsMatrixClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Edit Skill Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="skillTitle1"><h6>Skill Category Name</h6></label>
                                <input
                                    className="form-control"
                                    name="skillTitle1"
                                    value={detailsUpdateModalMatrix.header}
                                    onChange={(ev) => {
                                      const updateNewMatrix = {
                                        id:  detailsUpdateModalMatrix.id,
                                        header: ev.target.value,
                                        portfolio: portfolio,
                                        skills: detailsUpdateModalMatrix.skills
                                      }
                                      setUpdateDetailModalMatrix(updateNewMatrix)
                                      }}>
                                </input>
                                <label htmlFor="skillTitle11"><h6>Skill Name 1</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillTitle11"
                                        value={updateSkillName1}
                                        onChange={(ev) => {
                                          setUpdateSkillName1(ev.target.value)
                                          }}>
                                    </input>
                            <label htmlFor="skillValue11"><h6>Skill Value 1</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillValue11"
                                        value={updateSkillValue1}
                                        onChange={(ev) => {
                                          !isNaN(parseInt(ev.target.value)) ?
                                          setUpdateSkillValue1(parseInt(ev.target.value)) : setUpdateSkillValue1(0);
                                          }}>
                                    </input>        
                              
                            <label htmlFor="skillTitle12"><h6>Skill Name 2</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillTitle12"
                                        value={updateSkillName2}
                                        onChange={(ev) => {
                                          setUpdateSkillName2(ev.target.value)
                                          }}>
                                    </input>
                            <label htmlFor="skillValue12"><h6>Skill Value 2</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillValue12"
                                        value={updateSkillValue2}
                                        onChange={(ev) => {
                                          !isNaN(parseInt(ev.target.value)) ?
                                          setUpdateSkillValue2(parseInt(ev.target.value)) : setUpdateSkillValue2(0);
                                          }}>
                                    </input>        
                              
                            <label htmlFor="skillTitle13"><h6>Skill Name 3</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillTitle13"
                                        value={updateSkillName3}
                                        onChange={(ev) => {
                                          setUpdateSkillName3(ev.target.value)
                                          }}>
                                    </input>
                            <label htmlFor="skillValue13"><h6>Skill Value 3</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillValue13"
                                        value={updateSkillValue3}
                                        onChange={(ev) => {
                                          !isNaN(parseInt(ev.target.value)) ?
                                          setUpdateSkillValue3(parseInt(ev.target.value)) : setUpdateSkillValue3(0);
                                          }}>
                                    </input>        
                              
                            <label htmlFor="skillTitle14"><h6>Skill Name 4</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillTitle14"
                                        value={updateSkillName4}
                                        onChange={(ev) => {
                                          setUpdateSkillName4(ev.target.value)
                                          }}>
                                    </input>
                            <label htmlFor="skillValue14"><h6>Skill Value 4</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillValue14"
                                        value={updateSkillValue4}
                                        onChange={(ev) => {
                                          !isNaN(parseInt(ev.target.value)) ?
                                          setUpdateSkillValue4(parseInt(ev.target.value)) : setUpdateSkillValue4(0);
                                          }}>
                                    </input>        
                              
                            <label htmlFor="skillTitle15"><h6>Skill Name 5</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillTitle15"
                                        value={updateSkillName5}
                                        onChange={(ev) => {
                                          setUpdateSkillName5(ev.target.value)
                                          }}>
                                    </input>
                            <label htmlFor="skillValue15"><h6>Skill Value 5</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillValue15"
                                        value={updateSkillValue5}
                                        onChange={(ev) => {
                                          !isNaN(parseInt(ev.target.value)) ?
                                          setUpdateSkillValue5(parseInt(ev.target.value)) : setUpdateSkillValue5(0);
                                          }}>
                                    </input>        
                              
                            <label htmlFor="skillTitle16"><h6>Skill Name 6</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillTitle16"
                                        value={updateSkillName6}
                                        onChange={(ev) => {
                                          setUpdateSkillName6(ev.target.value)
                                          }}>
                                    </input>
                            <label htmlFor="skillValue16"><h6>Skill Value 6</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillValue16"
                                        value={updateSkillValue6}
                                        onChange={(ev) => {
                                          !isNaN(parseInt(ev.target.value)) ?
                                          setUpdateSkillValue6(parseInt(ev.target.value)) : setUpdateSkillValue6(0);
                                          }}>
                                    </input>        
            

                            </div>
                            <br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateShowDetailsMatrixClose}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={() => {
                          const skill1:Skill =
                           { name: updateSkillName1 , value: updateSkillValue1 }
                           const skill2:Skill =
                          { name: updateSkillName2 , value: updateSkillValue2 }
                           const skill3:Skill =
                          { name: updateSkillName3 , value: updateSkillValue3 }
                           const skill4:Skill =
                          { name: updateSkillName4 , value: updateSkillValue4 }
                           const skill5:Skill =
                          { name: updateSkillName5 , value: updateSkillValue5 }
                           const skill6:Skill =
                          { name: updateSkillName6 , value: updateSkillValue6 }
                          
                          const skill:Array<Skill> = []
                          const intermidiateSkillList:Array<Skill> = [ skill1, skill2, skill3, skill4, skill5, skill6 ]
                          for(let i=0; i<intermidiateSkillList.length; i++){
                            if(intermidiateSkillList[i].name != ""){
                              skill.push(intermidiateSkillList[i]);
                            }
                          }
                          const newUpdateMatrix:Matrix = {
                              id: detailsUpdateModalMatrix.id,
                              header: detailsUpdateModalMatrix.header,
                              portfolio: detailsUpdateModalMatrix.portfolio,
                              skills: skill
                          }
                          updateMatrix(newUpdateMatrix);
                          window.location.reload(true);
                          }}>Update</Button>
                    </Modal.Footer>
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
