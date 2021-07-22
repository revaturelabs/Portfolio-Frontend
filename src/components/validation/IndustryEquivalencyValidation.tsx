const industrySkillNameValidation = (skillName: string) => {

    if (skillName) {
        return true;
    }
    else {
        return false;
    }

}


const industrySkillEditValidation = (skillSet: Array<Object>) => {

    if(skillSet.length >= 1) {
        return true;
    } else {
        return false;
    }
}
export default industrySkillNameValidation;

export {industrySkillEditValidation};