import { Link } from "react-router-dom";
import AboutMeView from "./AboutMeView";
import EducationView from "./EducationView";
import HonorAwardView from "./HonorAwardView";
import OtherWorkExperienceView from "./OtherWorkExperienceView";
import ProjectView from "./ProjectView";
import RevatureWorkExperienceView from "./RevatureWorkExperienceView"

const ViewPortfolio = () => {
    return (
        <div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                <Link to="/portfolio">
                    <button className="btn btn-primary m-1">Back</button>
                </Link>
            </div>
            {/* industry equiv */}
            <AboutMeView />
            <EducationView />
            <RevatureWorkExperienceView
                url="http://3.236.213.150:8081/workexperience" 
                title = "Work Experience"/>
            <ProjectView />
            <RevatureWorkExperienceView
                url="http://3.236.213.150:8081/workhistory"
                title="Other Work Experience" />
            {/* <OtherWorkExperienceView /> */}
            <HonorAwardView />
        </div>
    );
}

export default ViewPortfolio;