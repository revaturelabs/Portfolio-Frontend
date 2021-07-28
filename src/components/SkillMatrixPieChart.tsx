import Matrix from "../interfaces/Matrix";
import CanvasJSReact from "../canvasjs.react.js";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function createChart(props: Matrix) {

    const elementData: { y: number; label: String; }[] = [];
    props.skills.forEach(skill => elementData.push({ y: skill.value, label: skill.name }));

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: props.header
        },
        data: [{
            type: "doughnut",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y} months",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelPlacement: "inside",
            indexLabel: " ",
            dataPoints: elementData,
        }]
    }

    return (
        <>
            <CanvasJSChart options={options} />
        </>
    );


}



