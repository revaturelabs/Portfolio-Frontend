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
import {Container, Row, Col, Form} from "react-bootstrap";
import { useForm } from "react-hook-form";

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

    const onSubmit = handleSubmit(data => console.log(data));

    useEffect(() => {
        if (cookie['admin'] && cookie['admin'].admin === true) {
            setPath("/admin");
            setAdmin(true);
        } else {
            setPath(cookie['portfolio'].submitted ? "/list" : "/portfolio");
        }
    });

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
                        <textarea rows={5} cols={40} placeholder="Enter feedback.." {...register("industryEquivalence")}></textarea>
                    </Col>
                </Row>
                
                <Row className="mt-5">
                    <Col sm={8}>
                        <AboutMeView />
                    </Col>
                    <Col sm={4}>
                        <textarea rows={5} cols={40} placeholder="Enter feedback.." {...register("aboutMe")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <RevatureWorkExperienceView
                    url={url + "/workexperience/portfolio/all/"}
                    title="Work Experience" />
                    </Col>
                    <Col sm={4}>
                        <textarea rows={5} cols={40} placeholder="Enter feedback.." {...register("workExperience")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <ProjectView />
                    </Col>
                    <Col sm={4}>
                    <textarea rows={5} cols={40} placeholder="Enter feedback.." {...register("project")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <EducationView />
                    </Col>
                    <Col sm={4}>
                    <textarea rows={5} cols={40} placeholder="Enter feedback.." {...register("education")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <CertificationView />
                    </Col>
                    <Col sm={4}>
                    <textarea rows={5} cols={40} placeholder="Enter feedback.." {...register("certification")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={8}>
                        <HonorAwardView />
                    </Col>
                    <Col sm={4}>
                    <textarea rows={5} cols={40} placeholder="Enter feedback.." {...register("honorsAndAwards")}></textarea>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
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