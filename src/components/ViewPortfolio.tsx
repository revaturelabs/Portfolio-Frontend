import { Link } from "react-router-dom";
import AboutMeView from "./AboutMeView";
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
            {/* education */}
            <RevatureWorkExperienceView />
            <ProjectView />
            <OtherWorkExperienceView />
            {/* Honor */}
        </div>
    );
}

export default ViewPortfolio;