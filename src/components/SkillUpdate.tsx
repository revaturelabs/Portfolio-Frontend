import axios from "axios";
import React, { useState, FC, CSSProperties } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { url } from "../api/api";
import Skill, { Matrix } from "../interfaces/Matrix";

const SkillCreation: FC<{
  hideModal: Function;
  editSkill: Skill;
  matrix: Matrix;
}> = (props) => {
  const backEndUrl = url + "/skill";
  const [cookies] = useCookies();
  const portfolio = ["portfolio"];
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const matrix = useState(props.matrix);

  const handleSave = () => {
    axios
      .post(backEndUrl, {
        name,
        value,
        matrix,
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
    <li>
      <Modal.Body>
        <form method="post">
          <h6>Name of Skill</h6>
          <input
            required
            type="text"
            name="name"
            className="form-input"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <h6>Months of Experience</h6>
          <input
            required
            type="number"
            name="value"
            className="form-input"
            onChange={(e) => setValue(e.target.value)}
          />
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
    </li>
  );
};

export default SkillCreation;
