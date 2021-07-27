const revWorkExpValidation = (employer: string, startDate: string, endDate: string, title: string, responsibilities: string, description: string, technologies: string) => {
    console.log("IN VALIDATION");
    if(employer && startDate && endDate && title && responsibilities && description && technologies){
        return true;
    }
    else{
        return false;
    }
    
}

export default revWorkExpValidation;