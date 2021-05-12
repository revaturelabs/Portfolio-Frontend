import React, { useState } from "react";
import { Button, Card, Modal, ModalTitle } from "react-bootstrap";
import { PlusCircle, QuestionCircle } from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";
import '../css/ProjectCard.css';

function ProjectCard() {
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
  const [projectName, setProjectName] = useState("");
  const [projectRolesResponsibilities, setProjectRolesResponsibilities] =
    useState("");
  const [projectEnvironmentTechnologies, setProjectEnvironmentTechnologies] =
    useState("");
  const [projectRepoUrl, setProjectRepoUrl] = useState("");
  const [projectWorkProducts, setProjectWorkProducts] = useState("");

  /**
   * Render project on page
   */
  const createProject = () => {
    let projects: Array<string> = [
      projectName,
      projectRolesResponsibilities,
      projectEnvironmentTechnologies,
      projectRepoUrl,
      projectWorkProducts,
    ];
    let project = document.querySelector(".project");
    let div = document.createElement("div");

    for (let index = 0; index < projects.length; index++) {
      let header = document.createElement("h1");
      div.appendChild(header);
      header.innerHTML = projects[index];
      project?.appendChild(div);
    }

    div.style.border = "2px solid black";
  };

  /**
   * Save data to database
   */
  const handleSave = () => {
    let projects: Array<string> = [
      projectName,
      projectRolesResponsibilities,
      projectEnvironmentTechnologies,
      projectRepoUrl,
      projectWorkProducts,
    ];
    setShowModal(false);
    console.log(projects);
  };

  /**
   * Details message
   */
  const messageDetails: string = "BLah blha blah";

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
                name="projectName"
                className="form-input"
                onChange={(e) => setProjectName(e.target.value)}
              />
              <br />
              <h6>Roles/Responsibilities</h6>
              <input
                type="text"
                name="projectRolesResponsibilities"
                className="form-input"
                onChange={(e) =>
                  setProjectRolesResponsibilities(e.target.value)
                }
              />
              <br />
              <h6>Environment/Technologies</h6>
              <input
                type="text"
                name="projectEnvironmentTechnologies"
                className="form-input"
                onChange={(e) =>
                  setProjectEnvironmentTechnologies(e.target.value)
                }
              />
              <br />
              <h6>Project Repo URL</h6>
              <input
                type="text"
                name="projectRepoUrl"
                className="form-input"
                onChange={(e) => setProjectRepoUrl(e.target.value)}
              />
              <br />
              <h6>Project Work Products</h6>
              <input
                type="text"
                name="projectWorkProducts"
                className="form-input"
                onChange={(e) => setProjectWorkProducts(e.target.value)}
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
                createProject();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Card.Body>
          <Card.Text className="project"></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProjectCard;
