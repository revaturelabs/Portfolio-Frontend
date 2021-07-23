/*
    Validate (return T, F) the additional work experience entered
     by the user in accordance with the following criteria:
    
     - All component fields contain data
*/

//Default verify otherWorkExpValidation Section
function otherWorkExpValidation(wrkExp: any): boolean[] 
{
    console.log("Validating Other Work Experiences");
    //check to ensure each field is not null
    const isValid = new Array<boolean>();
    wrkExp.keys().map((key: any, keyIndex: any) => {
        //if(!wrkExp.values()[keyIndex]) {
            //return `Error, ${key} cannot be left blank`;
            
            isValid.push(wrkExp.values()[keyIndex]);
    });


    //check if start date excedes endDate, an error, types are
    //coerced into numbers
    const startDateField = 'startDate';
    const endDateField = 'endDate';
    if(checkDatesInOrder(wrkExp.startDate, wrkExp.endDate)) {
        wrkExp.keys().map((key: any, keyIndex: any) => { 
            if(key == startDateField || key == endDateField) {
                isValid[keyIndex] = false;
            }
        });
    }

    return isValid;
}

//check if the startDate precedes the end date
function checkDatesInOrder(start: number, end: number) {
    if(start > end) {
        return false;
    }
    return true;
}

export default otherWorkExpValidation