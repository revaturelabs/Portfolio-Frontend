/*
    Validate (return T, F) the additional work experience entered
     by the user in accordance with the following criteria:
    
     - All component fields contain data
*/

//Default verify otherWorkExpValidation Section
const otherWorkExpValidation = (wrkExp: any) => {

    //check to ensure each field is not null
    const errs = [];
    wrkExp.keys().map((key: any, keyIndex: any) => {
        if(!wrkExp.values()[keyIndex]) {
            return `Error, ${key} cannot be left blank`;
        }
    });

    //particular validating requirements

    return false;
}


export default otherWorkExpValidation