/*
    Validate (return T, F) the project inputted by the user
    in accordance with the following criteria:
    P1
        - >=1 Project listed 
        - All fields populated with some content
        - Github repo is public
        - >= 8 roles/responsibilities in the project

    P2
        - >= 3 total projects must be entered
        - all criteria met from P1 per each project

        **Typescript**
*/



//Default Exported function that handles general validation - returns boolean array of 'true's
// if all states are valid
//and calls other utility functions as necessary
function ProjectValidation(project: any): boolean[] {
    //console.log("Validating Project");

    ////Work Products is allowed to be null so we put a dummy value in there
    //to make sure it is never null, whatever we put in here wont override the true value
    project.workProducts = "lorem ipsum";   //dummy string

    //Check to ensure no field is null via iteration
    const validElems = new Array<boolean>();
    Object.keys(project).map((key: any, keyIndex: any) => {
            validElems.push(!!Object.values(project)[keyIndex]);            
    });

    //validate roles/respnse
        //8 bp
    const minBullets = 8;
    const rolesRspFieldName = 'responsibilities';
    Object.keys(project).map((key: any, keyIndex: any) => {
        //console.log("FIELD NAME: " + key);
        if(key == rolesRspFieldName) {
            validElems[keyIndex] = validElems[keyIndex] &&
             checkEnoughBullets(Object.values(project)[keyIndex], minBullets);
        }
    });

    //validate github link
        //valid github url
        //public repo
        const gitLinkFieldName = 'roles';
        Object.keys(project).map((key: any, keyIndex: any) => {
            if(key == gitLinkFieldName) {
                validElems[keyIndex] = validElems[keyIndex] &&
                 !checkGitHubIsPublic(Object.values(project)[keyIndex]);
            }
        });

    return validElems;
}


//Check if there are enough bullets in roles/responsibilities section
//bullets will be delimitted by \n characters
function checkEnoughBullets(rspbts:any, minBullets: number) {

    //check if string is null/undefined
    if(!rspbts) { return false; }

    //Need to count 7 '\n' instances in text
    const numBullets = (rspbts.match(/\n/g) || '').length + 1;

    return (numBullets >= minBullets);
}

function checkGitHubIsPublic(link: any) {
    return true;
}


export default ProjectValidation;

