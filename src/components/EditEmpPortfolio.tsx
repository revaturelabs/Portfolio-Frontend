import React from 'react';
import RevatureWorkExp from './RevatureWorkExperience';
import "../css/EditEmpPortfolio.css"
import { Link } from 'react-router-dom';
import AboutMe from './AboutMe';
import Project from './Project';
import OtherWorkExperience from './OtherWorkExperience';
import HonorAwards from './HonorAward';
import IndustryEquivalency from './IndustryEquivalency';
import EducationContainer from './EducationContainer';
import { useCookies } from 'react-cookie';
import { Button } from 'react-bootstrap';
import CertificationContainer from './CertificationContainer';
import axios from 'axios';
import {url} from "../api/api";
import { useEffect, useState } from 'react';


const EditEmpPortfolio = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies();

    //component info for phase-based submit validation
    const [educations, setEducations] = useState([]);
    const [aboutMe, setAboutMe] = useState(null);
    const [projects, setProjects] = useState([]);
    const [indEquiv, setIndEquiv] = useState([]);

    console.log(cookies['portfolio']);
    
    useEffect( () => {

        //grab education info
        axios.get(url + "/education/portfolio/all/" + cookies['portfolio'].id)
            .then(response => setEducations(response.data));

        //grab about me info
        axios.get(url + "/aboutMe/portfolio/" + cookies['portfolio'].id)
            .then(response => setAboutMe(response.data));

        //grab project info
        axios.get(url + "/projects/portfolio/all/" + cookies['portfolio'].id)
        .then(response => setProjects(response.data));

        //grab industry equivalance info
        axios.get(url + "/equiv/portfolios/all/" + cookies['portfolio'].id)
        .then(response => setIndEquiv(response.data));

    }, []);

    const handleBack = () => {
        removeCookie('portfolio', { maxAge: 0 })
    }

    //submit the portfolio for review
    const handleSubmit = () => {
        const portfolioObj = {...cookies['portfolio']}
        console.log("Portfolio: " + portfolioObj);


        //Phase 1 Validation
        if(!portfolioObj.reviewed){
            //ensure about me, education, and project 1 exist
            console.log("about me = " + aboutMe);
            console.log("edu length = " + educations.length);
            console.log("projects length =" + projects.length);

            if(aboutMe && educations.length && projects.length){
                let obj = {
                    ...cookies['portfolio'],
                    submitted: true
                }
                console.log(obj);
                setCookie('portfolio', obj, { path: '/' });
                axios.post(url + `/portfolios/${cookies['portfolio'].id}`, { ...obj }).catch(error => {
                    console.log(error);
                });
                window.location.replace("http://localhost:3000/list");
                handleBack(); 
            }
            else{
                console.log("Insufficient work done for phase 1");
                if(!aboutMe){
                    console.log("About me is incomplete");
                    
                }
                if(!educations.length){
                    console.log("Education is incomplete");
                    
                }
                if(!projects.length){
                    console.log("Project 1 is incomplete");
                    
                }
            }
            
        }
        //Phase 2 Validation
        else{
            if(indEquiv.length == 5 && projects.length == 3){

                let obj = {
                    ...cookies['portfolio'],
                    submitted: true
                }
                console.log(obj);
                setCookie('portfolio', obj, { path: '/' });
                axios.post(url + `/portfolios/${cookies['portfolio'].id}`, { ...obj }).catch(error => {
                    console.log(error);
                });
                window.location.replace("http://localhost:3000/list");
                handleBack(); 
            }
            else{
                console.log("Insufficient work done for phase 2");
                if(indEquiv.length != 5){
                    console.log("Need 5 skills for industry equilvalancy");
                    
                }
                if(projects.length != 3){
                    console.log("Need information for 3 projects");
                    
                }
            }
        }              
    }

    return (
        <div>
            <div className="container mt-4">
                <h1>{cookies['portfolio'].name}</h1>
            </div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                {/* <Link to={cookies['portfolio'].submitted ? "/list" : "/portfolio"}> */}
                    <button className="btn btn-primary m-1" onClick={() => handleSubmit()}>Submit for Review</button>
                {/* </Link> */}
                <Link to="/view">
                    <button className="btn btn-primary m-1">View Portfolio</button>
                </Link>
                <Link to="/list">
                    <Button variant="primary" className="m-1" onClick={() => handleBack()}>Back</Button>
                </Link>
            </div>
            <IndustryEquivalency /> <br />
            <AboutMe /> <br />
            <RevatureWorkExp /> <br />
            <Project /> <br />
            <OtherWorkExperience /> <br />
            <EducationContainer /> <br />
            <CertificationContainer /> <br />
            <HonorAwards /> <br />
        </div>
    );
};

export default EditEmpPortfolio;