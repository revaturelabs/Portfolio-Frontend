import { Link } from "react-router-dom";
import IndustryEquivalency from './IndustryEquivalency';
import AboutMeView from "./AboutMeView";
import OtherWorkExperienceView from "./OtherWorkExperienceView";
import ProjectView from "./ProjectView";
import RevatureWorkExperienceView from "./RevatureWorkExperienceView"
import Education from "./Education";
import HonorAwards from "./HonorAward";

const ViewPortfolio = () => {
    return (
        <div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                <Link to="/portfolio">
                    <button className="btn btn-primary m-1">Back</button>
                </Link>
            </div>
            <IndustryEquivalency />
            <AboutMeView />
            <Education />
            <RevatureWorkExperienceView />
            <ProjectView />
            <OtherWorkExperienceView />
            <HonorAwards />
        </div>
    );
}

export default ViewPortfolio;