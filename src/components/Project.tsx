import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Modal, ModalTitle } from "react-bootstrap";
import { PlusCircle, QuestionCircle } from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";
import "../css/Project.css";

//FIXME: coordinate with back end component owner to create all necessary fields
const Project = () => {
  /**
   * Render projects on load
   */
  useEffect(() => {
    getAllProjects();
  }, []);

  /**
   * Render projects on page
   * FIXME: update this method to properly render data from getAllProjects()
   */
  const renderProjects = (
    id: string,
    name: string,
    description: string,
    responsibilities: string,
    technologies: string,
    repositoryUrl: string,
    workProducts: string
  ) => {

    let project = document.querySelector(".projects");
    let div = document.createElement("div");

    setId(id);
    
    let nameHeader = document.createElement('h6');
    nameHeader.innerHTML = name
    setName(name);

    setDescription(description);
    setResponsibilities(responsibilities);
    setTechnologies(technologies);
    setRepositoryUrl(repositoryUrl);
    setWorkProducts(workProducts);

    div.appendChild(nameHeader);
    project?.appendChild(div);

    div.style.border = "2px solid black";
  };

  /**
   * Show/Hide Modal
   */
  const [showModal, setShowModal] = useState(false);
  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  /**
   * Tooltip for add button
   */
  const [showAddTooltip, setShowAddTooltip] = useState(false);
  const toggleAddTooltip = () => setShowAddTooltip(!showAddTooltip);

  /**
   * Tooltip for details button
   */
  const [showDetailsTooltip, setShowDetailsTooltip] = useState(false);
  const toggleDetailsTooltip = () => setShowDetailsTooltip(!showDetailsTooltip);

  /**
   * 'Add project' state handling
   */
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [workProducts, setWorkProducts] = useState("");

  /**
   * Get data from the database
   */
  const getAllProjects = async () => {
    axios
      .get("http://3.236.213.150:8081/projects")
      .then((response) => {
        console.log("got data");
        console.log(response.data);
        response.data.map((data: any) => {
          renderProjects(
            data.id,
            data.name,
            data.description,
            data.responsibilities,
            data.technologies,
            data.repositoryUrl,
            data.workProducts
          )
          console.log(data);
        });
      })
      .catch((error) => {
        console.log("did not get data");
      });
  };

  /**
   * Save data to database
   */
  const handleSave = async () => {
    axios
      .post("http://3.236.213.150:8081/projects", {
        name,
        description,
        responsibilities,
        technologies,
        repositoryUrl,
        workProducts,
      })
      .then((response) => {
        console.log("success");
        console.log(response.data.name);
        // window.location.reload();
      })
      .catch((error) => {
        console.log("error");
      });
    setShowModal(false);
  };

  /**
   * Delete data from database
   */
  const handleDelete = (id: number) => {
    axios
      .delete(`http://3.236.213.150:8081/projects/${id}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });
  };

  /**
   * Details message
   */
  const messageDetails: string = "BLah blha blah";
  let rowLength = 5;

  return (
    <div className="container">
      <Card id="card-container">
        <Card.Header id="header-project">
          <h4>
            Project
            <QuestionCircle
              id="card-info"
              onClick={() => alert(messageDetails)}
            />
            <PlusCircle id="add-project" onClick={handleShowModal} />
            <Tooltip
              target="card-info"
              isOpen={showDetailsTooltip}
              toggle={toggleDetailsTooltip}
            >
              Details
            </Tooltip>
            <Tooltip
              target="add-project"
              isOpen={showAddTooltip}
              toggle={toggleAddTooltip}
            >
              Add Project
            </Tooltip>
          </h4>
        </Card.Header>
        <Modal show={showModal} onHide={handleHideModal} backdrop="static">
          <Modal.Header>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form method="post">
              <h6>Project Name</h6>
              <input
                type="text"
                name="name"
                className="form-input"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <h6>Project Description</h6>
              <textarea
                style={{ width: "100%" }}
                rows={rowLength}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <h6>Responsibilities</h6>
              <input
                type="text"
                name="responsibilities"
                className="form-input"
                onChange={(e) => setResponsibilities(e.target.value)}
              />
              <br />
              <h6>Technologies</h6>
              <input
                type="text"
                name="technologies"
                className="form-input"
                onChange={(e) => setTechnologies(e.target.value)}
              />
              <br />
              <h6>Project Repo URL</h6>
              <input
                type="text"
                name="repositoryUrl"
                className="form-input"
                onChange={(e) => setRepositoryUrl(e.target.value)}
              />
              <br />
              <h6>Project Work Products</h6>
              <input
                type="text"
                name="workProducts"
                className="form-input"
                onChange={(e) => setWorkProducts(e.target.value)}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Card.Body>
          <Card.Text className="projects"></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Project;
