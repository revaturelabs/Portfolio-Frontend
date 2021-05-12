import React from 'react';
import RevatureWorkExp from './RevatureWorkExperience';


const EditEmpPortfolio = () => {
    return (
        <div>
            <div className="container mb-5 mt-5">
                <button className="btn btn-primary m-1">Submit for Review</button>
                <button className="btn btn-primary m-1">View Portfolio</button>
                <button className="btn btn-primary m-1">Back</button>
            </div>
            <RevatureWorkExp />
        </div>
    );
};

export default EditEmpPortfolio;