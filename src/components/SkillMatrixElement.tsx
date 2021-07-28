import { useState, useEffect } from "react";
import { matrixUrl } from "../api/api";
import Matrix, { Skill } from "../interfaces/Matrix";
import axios from "axios";

export default function SkillMatrixElementUpdate(props : Matrix){
  const [element, updateElement] = useState(props);

  useEffect(() => {
    axios.post(`${matrixUrl}/${props.id}`)
      .then((response) => updateElement(response.data))
  }, []);

  return <>
      
  </>;
};

export function SkillMatrixElementCreate(props : Matrix){
    const [element, updateElement] = useState(props);
  
    useEffect(() => {
      axios.post(`${matrixUrl}`)
        .then((response) => updateElement(response.data))
    }, []);
  
    return <>
        
    </>;
  };

  export function SkillMatrixElementDelete(props : Matrix){
    const [element, updateElement] = useState(props);
  
    useEffect(() => {
      axios.delete(`${matrixUrl}/${props.id}`)
        .then((response) => updateElement(response.data))
    }, []);

  };