
const educationValidation = (university: string, degree: string, graduationDate: string, gpa: number) => {
    console.log("IN VALIDATION");
    if(university && degree && graduationDate && gpa){
        return true;
    }
    else{
        return false;
    }
    
}

export default educationValidation;