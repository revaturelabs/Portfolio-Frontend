/*
    Validate (return T, F) the additional work experience entered
     by the user in accordance with the following criteria:
    
     - All component fields contain data
*/

//Default verify otherWorkExpValidation Section
function otherWorkExpValidation(wrkExp: any): Array<boolean> 
{
    //check to ensure each field is not null
    const isValid = new Array<boolean>();
    Object.keys(wrkExp).map((key: any, keyIndex: any) => {
        //if(!wrkExp.values()[keyIndex]) {
            //return `Error, ${key} cannot be left blank`;
            //coerce to boolean
            isValid.push(!!Object.values(wrkExp)[keyIndex]);
    });


    //check if start date excedes endDate, an error, types are
    //coerced into numbers
    const startDateField = 'startDate';
    const endDateField = 'endDate';
    if(!checkDatesInOrder(wrkExp.startDate, wrkExp.endDate)) {
        Object.keys(wrkExp).map((key: any, keyIndex: any) => { 
            if(key == startDateField || key == endDateField) {
                isValid[keyIndex] = false;
            }
        });
    }

    console.log("RETURNING IS VALID WITH arr: ");
    isValid.forEach((elem) => console.log(elem));

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