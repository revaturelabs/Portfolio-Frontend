import axios from "axios";
import React, { useState, FC, CSSProperties } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { url } from "../api/api";

const MatrixCreation: FC<{ hideModal: Function }> = (props) => {
  const backEndUrl = url + "/matrix";
  const [cookies] = useCookies();
  const portfolio = cookies["portfolio"];

  const [header, setHeader] = useState("");

  const handleSave = () => {
    axios
      .post(backEndUrl, {
        portfolio,
        header,
      })
      .then(() => {})
      .catch(() => {
        console.log("error");
      })
      .then(() => {
        props.hideModal();
        window.location.reload();
      });
  };

  let addButtonStyles: CSSProperties = {
    background: "rgb(242, 105, 3)",
    borderColor: "rgb(242, 105, 3)",
  };

  return (
    <div className="container">
      <Modal.Body>
        <form method="post">
          <h6>Name of Matrix</h6>
          <input
            required
            type="text"
            name="header"
            className="form-input"
            onChange={(e) => setHeader(e.target.value)}
          />
          <br />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.hideModal()}>
          Close
        </Button>
        <Button
          variant="primary"
          style={addButtonStyles}
          onClick={() => handleSave()}
        >
          Add
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default MatrixCreation;
