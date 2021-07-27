import { useState, FC, useEffect } from "react";
import { matrixUrl } from "../api/api";
import { useCookies } from "react-cookie";
import Matrix, { Skill } from "../interfaces/Matrix";
import axios from "axios";

const SkillMatrixContainer = () => {
  const [matrices, updateMatrices] = useState();
  const [cookies] = useCookies();
  const portfolio = cookies["portfolio"];

  useEffect(() => {
    axios.get(`${matrixUrl}/portfolio/${portfolio.id}`)
      .then((response) => updateMatrices(response.data))
  }, []);

  return <>
  
  </>;
};

export default SkillMatrixContainer;
