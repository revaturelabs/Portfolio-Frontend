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


const EditEmpPortfolio = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies()

    const handleBack = () => {
        removeCookie('portfolio', {maxAge: 0})
    }

    return (
        <div>
            <div className="container mt-4">
                <h1>{cookies['portfolio'].name}</h1>
            </div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                <button className="btn btn-primary m-1">Submit for Review</button>
                <Link to="/view">
                    <button className="btn btn-primary m-1">View Portfolio</button>
                </Link>
                <Link to="/list">
                    <Button variant="primary" className="m-1" onClick={() => handleBack()}>Back</Button>
                </Link>
            </div>
            <IndustryEquivalency /> <br />
            <AboutMe /> <br/>
            <RevatureWorkExp /> <br/>
            <Project /> <br />
            <OtherWorkExperience /> <br />
            <EducationContainer /> <br />
            <CertificationContainer /> <br />
            <HonorAwards /> <br />
        </div>
    );
};

export default EditEmpPortfolio;