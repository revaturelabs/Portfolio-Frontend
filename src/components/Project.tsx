import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Modal, ModalTitle } from "react-bootstrap";
import {
  Pencil,
  PlusCircle,
  QuestionCircle,
  Trash,
} from "react-bootstrap-icons";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
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

    let nameHeader = document.createElement("h2");
    let descriptionContent = document.createElement("p");
    let responsibilitiesHeader = document.createElement("h3");
    let responsibilitiesContent = document.createElement("p");
    let technologiesHeader = document.createElement("h3");
    let technologiesContent = document.createElement("p");
    let repositoryUrlHeader = document.createElement("h5");
    let repositoryUrlContent = document.createElement("p");
    let workProductsHeader = document.createElement("h5");
    let workProductsContent = document.createElement("p");

    nameHeader.innerHTML = name;
    setName(name);

    descriptionContent.innerHTML = description;
    setDescription(description);

    responsibilitiesHeader.innerHTML = "Responsibilities";
    responsibilitiesContent.innerHTML = responsibilities;
    setResponsibilities(responsibilities);

    technologiesHeader.innerHTML = "Technologies";
    technologiesContent.innerHTML = technologies;
    setTechnologies(technologies);

    // TODO: make repositoryUrlContent link to repository
    repositoryUrlHeader.innerHTML = "Repository URL";
    repositoryUrlContent.innerHTML = repositoryUrl;
    setRepositoryUrl(repositoryUrl);

    // TODO: make workProductsContent links to files in database (s3?)
    workProductsHeader.innerHTML = "Work Products";
    workProductsContent.innerHTML = workProducts;
    setWorkProducts(workProducts);

    div.appendChild(nameHeader);
    div.appendChild(descriptionContent);
    div.appendChild(responsibilitiesHeader);
    div.appendChild(responsibilitiesContent);
    div.appendChild(technologiesHeader);
    div.appendChild(technologiesContent);
    div.appendChild(repositoryUrlHeader);
    div.appendChild(repositoryUrlContent);
    div.appendChild(workProductsHeader);
    div.appendChild(workProductsContent);
    project?.appendChild(div);

    div.style.border = "1px solid grey";
    div.style.padding = "1em";
    div.style.margin = "1em";
  };

  /**
   * Show/Hide Modal
   */
  const [showModal, setShowModal] = useState(false);
  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleHideModalEdit = () => setShowModalEdit(false);
  const handleShowModalEdit = () => setShowModalEdit(true);

  /**
   * Tooltips
   */
  const [showAddTooltip, setShowAddTooltip] = useState(false);
  const toggleAddTooltip = () => setShowAddTooltip(!showAddTooltip);
  const [showDetailsTooltip, setShowDetailsTooltip] = useState(false);
  const toggleDetailsTooltip = () => setShowDetailsTooltip(!showDetailsTooltip);
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const toggleEditTooltip = () => setShowEditTooltip(!showEditTooltip);

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
          );
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
    setShowModalEdit(false);
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
              {/* TODO: make this a rich text field */}
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
          <Card.Text className="projects">
            {/* TODO: trash and pencil buttons need to show in the footer of each project div/card */}
            <Trash id="delete-project"></Trash>
            <Pencil id="edit-project" onClick={handleShowModalEdit}></Pencil>
            <Tooltip
              target="edit-project"
              isOpen={showEditTooltip}
              toggle={toggleEditTooltip}
            >
              Edit
            </Tooltip>

            {/* 'Edit' Modal */}
            <Modal
              show={showModalEdit}
              onHide={handleHideModalEdit}
              backdrop="static"
            >
              <Modal.Header>
                <Modal.Title>Edit Project</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modalBody">
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
                  {/* TODO: make this a rich text field */}
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
                <Button variant="secondary" onClick={handleHideModalEdit}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Project;
