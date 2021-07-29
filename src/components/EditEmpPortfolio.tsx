import axios from "axios";
import React from "react";
import {
    Button,
    Col,
    Container,
    OverlayTrigger,
    Popover,
    Row
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { portfolioUrl } from "../api/api";
import "../css/EditEmpPortfolio.css";
import AboutMe from "./RevatureAboutMe";
import CertificationContainer from "./CertificationContainer";
import EducationContainer from "./EducationContainer";
import HonorAwards from "./HonorAward";
import IndustryEquivalency from "./IndustryEquivalency";
import OtherWorkExperience from "./OtherWorkExperience";
import Project from "./Project";
import RevatureWorkExp from "./RevatureWorkExperience";
import {url} from "../api/api";
import { useEffect, useState } from 'react';


const EditEmpPortfolio = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  let savedFlags = {aboutMe: "",
  certification: "",
  education: "",
  honorsAndAwards: "",
  industryEquivalence: "",
  project: "",
  workExperience: ""};


  if (cookies.portfolio.flags) {
    savedFlags = cookies.portfolio.flags;
  }


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
    removeCookie("portfolio", { maxAge: 0 });
  };

    const handleSubmit = () => {
        const portfolioObj = {...cookies['portfolio']}
        console.log("Portfolio: " + portfolioObj);

        if(!portfolioObj.reviewed){
            //ensure about me, education, and project 1 exist
            console.log("about me = " + aboutMe);
            console.log("edu length = " + educations.length);
            console.log("projects length =" + projects.length);

            //Phase 1 Validation
            if(aboutMe && educations.length && projects.length){
                let obj = {
                    ...cookies['portfolio'],
                    submitted: true
                }
                console.log(obj);

                setCookie('portfolio', obj, { path: '/' });
                axios.post(`${portfolioUrl}/${cookies["portfolio"].id}`, { ...obj }).catch(error => {
                    console.log(error);
                });

                window.location.replace("http://localhost:3000/list");
                handleBack(); 
            }
            else{
                console.log("Insufficient work done for phase 1");
                let toastMessage = new Array<string>();

                if(!aboutMe){
                    console.log("About me is incomplete");
                    toastMessage.push("About Me");
                    
                }
                if(!educations.length){
                    console.log("Education is incomplete");
                    toastMessage.push("Education");
                    
                }
                if(!projects.length){
                    console.log("Project 1 is incomplete");
                    toastMessage.push("Project 1");
                    
                }
            
                //try to add toast w toastMessages....
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
                axios.post(`${portfolioUrl}/${cookies["portfolio"].id}`, { ...obj }).catch(error => {
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
    };

  const popoverIndustryEquivalency = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Industry Equivalency Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.industryEquivalence}</Popover.Content>
    </Popover>
  );

  const popoverAboutMe = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        About Me Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.aboutMe}</Popover.Content>
    </Popover>
  );

  const popoverWorkExperience = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Work Experience Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.workExperience}</Popover.Content>
    </Popover>
  );

  const popoverProject = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Project Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.project}</Popover.Content>
    </Popover>
  );

  const popoverEducation = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Education Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.education}</Popover.Content>
    </Popover>
  );

  const popoverCertification = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Certification Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.certification}</Popover.Content>
    </Popover>
  );

  const popoverHonorsAndAwards = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Honors & Awards Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.honorsAndAwards}</Popover.Content>
    </Popover>
  );

  if (cookies.portfolio.flags) {
  return (
        <Container className="mb-5 mt-5">
      <div className="container mt-4">
        <h1>{cookies["portfolio"].name}</h1>
      </div>
      <div className="container mb-5 mt-5" id="editPortfolioButtons">
        {/* <Link to="/list"> */}
          <button
            className="btn btn-primary m-1"
            onClick={() => handleSubmit()}
          >
            Submit for Review
          </button>
        {/* </Link> */}
        <Link to="/view">
          <button className="btn btn-primary m-1">View Portfolio</button>
        </Link>
        <Link to="/list">
          <Button
            variant="primary"
            className="m-1"
            onClick={() => handleBack()}
          >
            Back
          </Button>
        </Link>
      </div>
      <Row>
        <Col sm={11}>
          <IndustryEquivalency />
        </Col>
        <Col sm={1}>
          {savedFlags.industryEquivalence !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverIndustryEquivalency}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col sm={11}>
          <AboutMe />
        </Col>
        <Col sm={1}>
          {savedFlags.aboutMe !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverAboutMe}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <RevatureWorkExp />
        </Col>
        <Col sm={1}>
          {savedFlags.workExperience !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverWorkExperience}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <Project />
        </Col>
        <Col sm={1}>
          {savedFlags.project !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverProject}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <EducationContainer />
        </Col>
        <Col sm={1}>
          {savedFlags.education !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverEducation}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <CertificationContainer />
        </Col>
        <Col sm={1}>
          {savedFlags.certification !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverCertification}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <HonorAwards />
        </Col>
        <Col sm={1}>
          {savedFlags.honorsAndAwards !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverHonorsAndAwards}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      </Container>
  );}
  else {
      return (
        <div>
            <div className="container mt-4">
                <h1>{cookies['portfolio'].name}</h1>
            </div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                {/* <Link to="/list"> */}
                    <button className="btn btn-primary m-1" onClick={() => handleSubmit()}>Submit for Review</button>
                {/* </Link> */}
                <Link to="/view">
                    <button className="btn btn-primary m-1">View Portfolio</button>
                </Link>
                <Link to={{ pathname: `${portfolioUrl}/full/${cookies['portfolio'].id}` }} target="_blank" >
                    <button className="btn btn-primary m-1">Export</button>
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
  }
};

export default EditEmpPortfolio;
