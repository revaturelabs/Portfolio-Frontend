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
  const renderProject = (
    id: string,
    name: string,
    description: string,
    responsibilities: string,
    technologies: string,
    repositoryUrl: string,
    workProducts: string
  ) => {
    let project = document.querySelector(".projects");
    let card = document.createElement("div");
    let cardHeader = document.createElement("div");
    let cardBody = document.createElement("div");
    let nameHeader = document.createElement("h2");
    let descriptionContent = document.createElement("p");
    let responsibilitiesHeader = document.createElement("h3");
    let responsibilitiesContent = document.createElement("p");
    let technologiesHeader = document.createElement("h3");
    let technologiesContent = document.createElement("p");
    let repositoryUrlHeader = document.createElement("h5");
    let repositoryUrlContent = document.createElement("a");
    let workProductsHeader = document.createElement("h5");
    // FIXME: make this conditional (what if no one uploads an img? if not null and not empty string, render, otherwise don't)

    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    let buttonDiv = document.createElement("div");

    deleteButton.setAttribute("id", "delete-project");
    deleteButton.setAttribute("class", "btn btn-danger");
    editButton.setAttribute("id", "edit-button");
    editButton.setAttribute("class", "btn btn-primary");
    card.setAttribute("class", "card");
    cardHeader.setAttribute("class", "card-header");
    cardBody.setAttribute("class", "card-body");
    repositoryUrlContent.setAttribute("href", repositoryUrl);
    repositoryUrlContent.setAttribute("target", "_blank");

    setId(id);
    setName(name);
    setDescription(description);
    setResponsibilities(responsibilities);
    setTechnologies(technologies);
    setRepositoryUrl(repositoryUrl);
    setWorkProducts(workProducts);

    nameHeader.innerHTML = name;
    descriptionContent.innerHTML = description;
    responsibilitiesHeader.innerHTML = "Responsibilities";
    responsibilitiesContent.innerHTML = responsibilities;
    technologiesHeader.innerHTML = "Technologies";
    technologiesContent.innerHTML = technologies;
    // TODO: make repositoryUrlContent link to repository
    repositoryUrlHeader.innerHTML = "Repository URL";
    repositoryUrlContent.innerHTML = repositoryUrl;
    // TODO: make workProductsContent links to files in database (s3?)
    workProductsHeader.innerHTML = "Work Products";
    // FIXME: change from innerHTML to source attribute of link
    // workProductsContent.innerHTML = workProducts;
    deleteButton.innerHTML = "Delete";
    editButton.innerHTML = "Edit";

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardHeader.appendChild(nameHeader);
    cardHeader.appendChild(buttonDiv);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    card.appendChild(descriptionContent);
    card.appendChild(responsibilitiesHeader);
    card.appendChild(responsibilitiesContent);
    card.appendChild(technologiesHeader);
    card.appendChild(technologiesContent);
    card.appendChild(repositoryUrlHeader);
    card.appendChild(repositoryUrlContent);
    card.appendChild(workProductsHeader);
    let workProductsContent;
    if (workProducts !== null && workProducts !== "") {
      workProductsContent = document.createElement("img");
      workProductsContent.setAttribute("src", workProducts);
      card.appendChild(workProductsContent);
    }
    project?.appendChild(card);

    deleteButton.style.margin = "0.25em 0.25em";
    editButton.style.margin = "0.25em 0.25em";

    card.style.border = "1px solid grey";
    card.style.padding = "1em";
    card.style.margin = "1em";

    deleteButton.addEventListener("click", () => {
      handleShowModalDelete();
    });
    editButton.addEventListener("click", () => {
      handleShowModalEdit();
    });
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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleHideModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);

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
          renderProject(
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
        setName("");
        setDescription("");
        setResponsibilities("");
        setTechnologies("");
        setRepositoryUrl("");
        setWorkProducts("");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error");
      });
    setShowModal(false);
  };

  /**
   * Delete data from database
   */
  const handleDelete = async (id: string) => {
    axios
      .delete(`http://3.236.213.150:8081/projects/${id}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        window.location.reload();
      });
  };

  const handleUpdate = async (id: string) => {
    axios
      .post(`http://3.236.213.150:8081/projects/${id}`, {
        name,
        description,
        responsibilities,
        technologies,
        repositoryUrl,
        workProducts,
      })
      .then((response) => {
        console.log("update: success");
        console.log(response.data.name);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error");
      });
    setShowModalEdit(false);
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
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <Card.Body>
          <Card.Text className="projects">
            {/* 'Delete' Modal */}
            <Modal
              show={showModalDelete}
              onHide={handleHideModalDelete}
              backdrop="static"
            >
              <Modal.Header>
                <Modal.Title>Delete Project?</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modalBody">
                <div>
                  <p>Are you sure?</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    style={{ margin: "0.25em 0.25em" }}
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ margin: "0.25em 0.25em" }}
                    onClick={handleHideModalDelete}
                  >
                    Cancel
                  </button>
                </div>
              </Modal.Body>
            </Modal>
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
                    value={name}
                    className="form-input"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <h6>Project Description</h6>
                  <textarea
                    style={{ width: "100%" }}
                    rows={rowLength}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br />
                  {/* TODO: make this a rich text field */}
                  <h6>Responsibilities</h6>
                  <input
                    type="text"
                    name="responsibilities"
                    value={responsibilities}
                    className="form-input"
                    onChange={(e) => setResponsibilities(e.target.value)}
                  />
                  <br />
                  <h6>Technologies</h6>
                  <input
                    type="text"
                    name="technologies"
                    value={technologies}
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
                    handleUpdate(id);
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
