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

const ViewPortfolio = () => {
    const [cookie,setCookie,removeCookie] = useCookies(['portfolio']);
    const [pathname, setPath] = useState("/list");

    useEffect(() => {
        setPath(cookie.submitted ? "/list" : "/portfolio");
    });

    const handleBack = (submitted: boolean) => {
        if(submitted) removeCookie('portfolio');
    }

    return (
        <div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                <Link to={pathname}>
                    <button className="btn btn-primary m-1" onClick={() => handleBack(cookie.submitted)}>Back</button>
                </Link>
            </div>
            <IndustryEquivalencyView /> <br />
            <AboutMeView /> <br />
            <EducationView /> <br />
            <RevatureWorkExperienceView
                url="http://3.236.213.150:8081/workexperience/portfolio/all/" 
                title = "Work Experience"/> <br />
            <ProjectView /> <br />
            <RevatureWorkExperienceView
                url="http://3.236.213.150:8081/workhistory/portfolio/all/"
                title="Other Work Experience" /> <br />
            {/* <OtherWorkExperienceView /> */}
            <HonorAwardView /> <br />
        </div>
    );
}

export default ViewPortfolio;