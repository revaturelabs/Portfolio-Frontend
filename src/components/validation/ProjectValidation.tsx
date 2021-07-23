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



//Default Exported function that handles general validation
//and calls other utility functions as necessary
function projectValidation(project: any): boolean[] {
    console.log("Validating Project");

    //Check to ensure no field is null via iteration
    const errs = new Array();
    project.keys().map((key: any, keyIndex: any) => {
        //if(!project.values()[keyIndex]) {
            //return `Error, ${key} cannot be left blank`;
            errs.push(!project.values()[keyIndex]);
    });

    //validate roles/respnse
        //8 bp
    const minBullets = 8;
    const rolesRspFieldName = 'roles';
    project.keys().map((key: any, keyIndex: any) => {
        if(key == rolesRspFieldName) {
            errs[keyIndex] = errs[keyIndex] ||
             !checkEnoughBullets(project.values()[keyIndex], minBullets);
        }
    });

    //validate github link
        //valid github url
        //public repo
        const gitLinkFieldName = 'roles';
        project.keys().map((key: any, keyIndex: any) => {
            if(key == gitLinkFieldName) {
                errs[keyIndex] = errs[keyIndex] ||
                 !checkGitHubIsPublic(project.values()[keyIndex]);
            }
        });
    
    return errs;
}


//Check if there are enough bullets in roles/responsibilities section
//bullets will be delimitted by \n characters
function checkEnoughBullets(rspbts:string, minBullets: number) {

    //Need to count 8 '\n' instances in text
    const numBullets = (rspbts.match(`//n/g`) || []).length;
    console.log("num bullets counted: " + numBullets);

    return (numBullets >= minBullets);
}

function checkGitHubIsPublic(link: string) {
    return true;
}


export default projectValidation;

