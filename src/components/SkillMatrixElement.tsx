import { useState, FC, useEffect } from "react";
import { matrixUrl } from "../api/api";
import { useCookies } from "react-cookie";
import Matrix, { Skill } from "../interfaces/Matrix";
import axios from "axios";
import CanvasJSReact from "../canvasjs.react.js";

var CanvasJS = CanvasJSReact.CanvasJS; 
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
  exportEnabled: true,
  animationEnabled: true,
  title: {
    text: "Website Traffic Sources"
  },
  data: [{
    type: "pie",
    startAngle: 75,
    toolTipContent: "<b>{label}</b>: {y}%",
    showInLegend: "true",
    legendText: "{label}",
    indexLabelFontSize: 16,
    indexLabel: "{label} - {y}%",
    dataPoints: [
      { y: 18, label: "Direct" },
      { y: 49, label: "Organic Search" },
      { y: 9, label: "Paid Search" },
      { y: 5, label: "Referral" },
      { y: 19, label: "Social" }
    ]
  }]
}

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
  
    return <>
        matrices.
    </>;
  };