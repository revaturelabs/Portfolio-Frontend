import React from 'react';
import useForm from './CreatePortfolioHook';
import portfolioValidate from './CreatePortfolioValidation';

const CreatePortfolio = () => {

    const {inputs, handleInputChange, handleSubmit, errors} = useForm({portfolioName: ''}, portfolioValidate)

    const error: {[key: string]: any} = errors

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h6>Portfolio Name</h6>
                <input type="text" name="portfolioName" id="portfolioName" className="form-input" onChange={handleInputChange} value={inputs.portfolioName} />
                {error.portfolioName && <p>{error.portfolioName}</p>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CreatePortfolio;