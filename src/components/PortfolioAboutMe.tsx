import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PortfolioAboutMe(props: {portId: any})  {
    const [portfolioId, setPortfilioId] = useState(0)
    const [aboutMe,  setAboutMe] = useState({
        id: 0,
        bio: "", 
        email: "",
        phone: ""

    })

    const getAboutMeData = () => {
        axios.get(`http://3.236.213.150:8081/aboutMe/portfolio/${props.portId}`)
         .then(({data}) => {       
             console.log("getData()", data)
             setAboutMe({
                 id: data.id,
                 bio: data.bio,
                 email: data.email,
                 phone: data.phone
             })
         })
    }
    useEffect(() => {getAboutMeData()}, [portfolioId])

    return (
        <div>
            <h5>About Me</h5>
            <p>id: {aboutMe.id}</p>
            <p>bio: {aboutMe.bio}</p>
            <p>email: {aboutMe.email}</p>
            <p>phone: {aboutMe.phone}</p>
        </div>
    )
}

export default PortfolioAboutMe

