import { Link } from "react-router-dom";
import IndustryEquivalencyView from './IndustryEquivalencyView';
import AboutMeView from "./AboutMeView";
import EducationView from "./EducationView";
import HonorAwardView from "./HonorAwardView";
import OtherWorkExperienceView from "./OtherWorkExperienceView";
import ProjectView from "./ProjectView";
import RevatureWorkExperienceView from "./RevatureWorkExperienceView"
import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";
import CertificationView from "./CertificationView";
import {url} from "../../api/api";
import {Container, Row, Col, Popover, OverlayTrigger, Button} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { portfolioUrl } from '../../api/api'

type FeedbackData = {
    industryEquivalence: string;
    aboutMe: string;
    workExperience: string;
    project: string;
    education: string;
    certification: string;
    honorsAndAwards: string;
};

const ViewPortfolio = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [pathname, setPath] = useState("/list");
    const [isAdmin, setAdmin] = useState(false);
    const {register, handleSubmit} = useForm<FeedbackData>();
    const [savedFlags, setSavedFlags] = useState({
        aboutMe: "",
        certification: "",
        education: "",
        honorsAndAwards: "",
        industryEquivalence: "",
        project: "",
        workExperience: ""
    });

    const onSubmit = handleSubmit(data => 
        axios.post(`${portfolioUrl}/${cookie.portfolio.id}`,{
        id:cookie.portfolio.id,
        name:cookie.portfolio.name,
        submitted:cookie.portfolio.submitted,
        approved:cookie.portfolio.approved,
        reviewed:cookie.portfolio.reviewed,
        feedback:cookie.portfolio.feedback,
        flags:data,
        user:cookie.user}) 
        );

    // const onSubmit = (e:any) => {
    //     e.preventDefault()

    //     if (!approved && !feedback){

    //        alert("Feedback must be provided if rejecting the portfolio. Your changes are not saved")
    //     }
    //     else{
    //    // this will be axios put to update portfolios back end
    // //    console.log ("update" + portId+name+submitted+approved+reviewed+feedback)
    //        axios.post(`${portfolioUrl}/${cookie.portfolio.id}`,{
    //        id:cookie.portfolio.id,
    //        name:cookie.portfolio.name,
    //        submitted:cookie.portfolio.submitted,
    //        approved:cookie.portfolio.approved,
    //        reviewed:cookie.portfolio.reviewed,
    //        feedback:cookie.portfolio.feedback,
    //        flags:data,
    //        user:cookie.user
    //    })
    //     }

      //props.history.push('/admin')
//    }

    useEffect(() => {
        axios.get(url + `/portfolios/${cookie['portfolio'].id}`).then(response => {
            if (response.data.flags) {
                console.log(response.data.flags);
                setSavedFlags(response.data.flags);
            } else {
                console.log("No flags")
            }
            
        })
    }, []);

    useEffect(() => {
        if (cookie['admin'] && cookie['admin'].admin === true) {
            setPath("/admin");
            setAdmin(true);
        } else {
            setPath(cookie['portfolio'].submitted ? "/list" : "/portfolio");
        }
    });

    const popoverIndustryEquivalency = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Industry Equivalency Feedback</Popover.Title>
          <Popover.Content>
          {savedFlags.industryEquivalence}
          </Popover.Content>
        </Popover>
    );

    const popoverAboutMe = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">About Me Feedback</Popover.Title>
          <Popover.Content>
          {savedFlags.aboutMe}
          </Popover.Content>
        </Popover>
    );

    const popoverWorkExperience = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Work Experience Feedback</Popover.Title>
          <Popover.Content>
          {savedFlags.workExperience}
          </Popover.Content>
        </Popover>
    );

    const popoverProject = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Project Feedback</Popover.Title>
          <Popover.Content>
          {savedFlags.project}
          </Popover.Content>
        </Popover>
    );

    const popoverEducation = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Education Feedback</Popover.Title>
          <Popover.Content>
          {savedFlags.education}
          </Popover.Content>
        </Popover>
    );

    const popoverCertification = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Certification Feedback</Popover.Title>
          <Popover.Content>
          {savedFlags.certification}
          </Popover.Content>
        </Popover>
    );

    const popoverHonorsAndAwards = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Honors and Awards Feedback</Popover.Title>
          <Popover.Content>
          {savedFlags.honorsAndAwards}
          </Popover.Content>
        </Popover>
    );


    const handleBack = (submitted: boolean) => {
        console.log(submitted);
        if (submitted) removeCookie('portfolio');
    }
    
    if (isAdmin) {
        return (
            <Container className="mb-5 mt-5">
                <form>
                <Row>
                    <Col sm={8}>
                        <IndustryEquivalencyView />
                    </Col>
                    <Col sm={4}>
                        {savedFlags.industryEquivalence !== "" &&
                        <OverlayTrigger trigger="click" placement="right" overlay={popoverIndustryEquivalency}>
                            <Button variant="error" size = "lg">⚑</Button>
                        </OverlayTrigger>
                        }
                        <textarea rows={5} cols={40} placeholder="Insert new feedback here..." {...register("industryEquivalence")}></textarea>
                    </Col>
                </Row>
                
                <Row className="mt-5">
                    <Col sm={8}>
                        <AboutMeView />
                    </Col>
                    <Col sm={4}>
                        {savedFlags.aboutMe !== "" &&
                        <OverlayTrigger trigger="click" placement="right" overlay={popoverAboutMe}>
                            <Button variant="error" size = "lg">⚑</Button>
                        </OverlayTrigger>
                        }
                        <textarea rows={5} cols={40} placeholder="Insert new feedback here..." {...register("aboutMe")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <RevatureWorkExperienceView
                    url={url + "/workexperience/portfolio/all/"}
                    title="Work Experience" />
                    </Col>
                    <Col sm={4}>
                        {savedFlags.workExperience !== "" &&
                        <OverlayTrigger trigger="click" placement="right" overlay={popoverWorkExperience}>
                            <Button variant="error" size = "lg">⚑</Button>
                        </OverlayTrigger>
                        }
                        <textarea rows={5} cols={40} placeholder="Insert new feedback here..." {...register("workExperience")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <ProjectView />
                    </Col>
                    <Col sm={4}>
                        {savedFlags.project !== "" &&
                        <OverlayTrigger trigger="click" placement="right" overlay={popoverProject}>
                            <Button variant="error" size = "lg">⚑</Button>
                        </OverlayTrigger>
                        }
                        <textarea rows={5} cols={40} placeholder="Insert new feedback here..." {...register("project")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <EducationView />
                    </Col>
                    <Col sm={4}>
                        {savedFlags.education !== "" &&
                        <OverlayTrigger trigger="click" placement="right" overlay={popoverEducation}>
                            <Button variant="error" size = "lg">⚑</Button>
                        </OverlayTrigger>
                        }
                        <textarea rows={5} cols={40} placeholder="Insert new feedback here..." {...register("education")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <CertificationView />
                    </Col>
                    <Col sm={4}>
                        {savedFlags.certification !== "" &&
                        <OverlayTrigger trigger="click" placement="right" overlay={popoverCertification}>
                            <Button variant="error" size = "lg">⚑</Button>
                        </OverlayTrigger>
                        }
                        <textarea rows={5} cols={40} placeholder="Insert new feedback here..." {...register("certification")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <HonorAwardView />
                    </Col>
                    <Col sm={4}>
                        {savedFlags.honorsAndAwards !== "" &&
                        <OverlayTrigger trigger="click" placement="right" overlay={popoverHonorsAndAwards}>
                            <Button variant="error" size = "lg">⚑</Button>
                        </OverlayTrigger>
                        }
                        <textarea rows={5} cols={40} placeholder="Insert new feedback here..." {...register("honorsAndAwards")}></textarea>
                        <br/><br/>
                        <button onClick={onSubmit} className="btn btn-primary m-1">Submit Feedback</button>
                    </Col>
                </Row>
                </form>
            </Container>
        );
    } else {
        return (
            <div>
                <div className="container mb-5 mt-5" id="editPortfolioButtons">
                    <Link to={pathname}>
                        <button className="btn btn-primary m-1" onClick={() => handleBack(cookie['portfolio'].submitted)}>Back</button>
                    </Link>
                </div>

                <IndustryEquivalencyView /> <br />
                <AboutMeView /> <br />
                <RevatureWorkExperienceView
                    url={url + "/workexperience/portfolio/all/"}
                    title="Work Experience" /> <br />
                <ProjectView /> <br />
                <RevatureWorkExperienceView
                    url={url + "/workhistory/portfolio/all/"}
                    title="Other Work Experience" /> <br />
                {/* <OtherWorkExperienceView /> */}
                <EducationView /> <br />
                {/* <EducationView
                    url=""
                    title="Certification" /> <br /> */}
                <CertificationView /> <br />
                <HonorAwardView /> <br />
            </div>
        );
    }
}

export default ViewPortfolio;