/**
 * A validtion component to validate the information in the about me component
 * prior to allowing it to be displayed on the webpage.
 * 
 * @author Kyle Castillo
 */

/**
     * Checks to see if the information is valid prior to allowing it to update.
     * 
     * FIXME this might need to be broken down into validation for EACH part. This way we can return whether a particular part of the bio is invalid.
     * @param bio The string that represents the bio, this will need to be a certain length to be valid.
     * @param phoneNumber The phone number inputted by the user, FIXME this might need to have RegEx to see if its valid
     * @param email The email that is inputted by the user, it needs to match an email's structure to be valid
     * @returns true if the information is valid, false if ANY of the following is invalid.
     * @deprecated While this function would still work it was replaced by individual components for more useful feedback.
     */
 export const aboutMeValidate =(bio:string, phoneNumber:string, email:string) =>{
    
    // Logging information for debugging purposes.
    // console.log("Attempting to validate an about me bio.")
    // console.log(`The bio's length ${bio.length}`);
    // console.log(`The email address ${email}`)
    // console.log(`The phone number ${phoneNumber}`)

    //Check to see if they are truthy.
    if(bio && phoneNumber && email){
        //Check to see if the bio is a certain length.
        if(bio.length < 100){ //FIXME, this might need a dynamic variable for size.
            console.log("The bio's length was too short to be valid.")
            return false;
        
        //Check to see if the email actually looks like an email.
        }else if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
            console.log("The email is invalid.")
            return false;
        
        //check to see if the phone number is structured like a phone number.
        } else if(!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNumber)){
            console.log("The phone number is invalid")
            return false;
        
        //All is well, the bio, phone number, and email are all valid.
        } else {
            console.log("All information is valid.")
            return true;
        }
    //A value was not filled in correctly, return false.
    } else {
        console.log("A field was not filled in.")
        return false;
    }
} 

/**
 * A validation function to check and see if the bio meets a fixed character length. Additionally this checks to see if the 
 * bio is not fasly.
 * @param bio A string representation of the bio submitted by a user.
 * @return true if the bio meets the designated length, false if its falsy or too short.
 */
  export const aboutMeValidateBio = (bio:string) =>{
    //Check to see if the bio is falsy.
    if(!bio){
        return false;
    //Check to see if the bio is at least a certain number of characters long.
    } else if(bio.length < 100){ //FIXME, using 100 as a const here is bad practice. Having something to get a length would be better.
        return false;
    //The bio meets bare minimum critieria to be submitted.
    } else {
        return true;
    }
}

/**
 * A validation function to check and see if the email matches an expected RegEx.
 * @param email A string representation of the email submitted by a user.
 * @returns true if the email is valid or false if its invalid in structure.
 */
export const aboutMeValidateEmail = (email:string) =>{
    const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //Check to see if the email is falsy.
    if(!email){
        return false;
    //Check to see if the email matches a RegEx for an email.
    } else if(!emailRegEx.test(email)){
        return false;
    //The email meets the bare minimum criteria to be submitted.
    } else {
        return true;
    }
}

/**
 * A validation function to check and see if the phone matches an expected RegEx.
 * @param phone A string representation of the phone number submitted by a user.
 * @returns true if the phone number is valid or false if its invalid in structure.
 */
export const aboutMeValidatePhone = (phone:string) =>{
    const phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    //Check to see if the phone is falsy
    if(!phone){
        return false;
    //Check to see if the phone number matches a RegEx for a phone number.
    } else if(!phoneRegEx.test(phone)){
        return false;
    //The phone number meets the bare minimum requirements to be submitted.
    } else {
        return true;
    }
}
