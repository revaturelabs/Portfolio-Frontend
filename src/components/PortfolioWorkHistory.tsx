import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PortfolioWorkHistory(props: {portId: any})  {
    const [portfolioId, setPortfilioId] = useState(0)
    const [workHistory,  setWorkHistory] = useState([{
        id: 0,
        title: "", 
        employer: "",
        responsibilities: "",
        description: "",
        tools: "",
        startDate: "",
        endDate: ""
    }])

    const getPortfolioWorkHistoryData = () => {
        axios.get(`http://3.236.213.150:8081/workhistory/portfolio/${props.portId}`)
         .then(({data}) => {       
             console.log("getPortfolioWorkHistoryData()", data)
             // variable data return an array of work history
             setWorkHistory(data)
         })
    }
    useEffect(() => {getPortfolioWorkHistoryData()}, [portfolioId])

    return (
        <div>
            <h5>Work History</h5>
            {
                workHistory.map((wh) => (
                    <div>
                    <p>id: {wh.id}</p>
                    <p>employer: {wh.employer}</p>
                    <p>description: {wh.description}</p>
                    </div>
                ))
            }
        </div>
    )
}
export default PortfolioWorkHistory

