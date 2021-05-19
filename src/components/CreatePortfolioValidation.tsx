const portfolioValidate = (inputs: any) => {
    const errors:{[key: string]: any} = {}

    //Portfolio name error
    if (!inputs.portfolioName) {
        errors.portfolioName = 'Portfolio Name cannot be left blank'
    }

    return errors

}

export default portfolioValidate;