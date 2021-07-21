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

const ViewPortfolio = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [pathname, setPath] = useState("/list");

    useEffect(() => {
        if (cookie['admin'] && cookie['admin'].admin === true) {
            setPath("/admin");
        } else {
            setPath(cookie['portfolio'].submitted ? "/list" : "/portfolio");
        }
    });

    const handleBack = (submitted: boolean) => {
        console.log(submitted);
        if (submitted) removeCookie('portfolio');
    }

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

export default ViewPortfolio;