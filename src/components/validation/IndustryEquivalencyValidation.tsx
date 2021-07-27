const industrySkillValidation = (skillName: string, equivalence: number) => {

    if (skillName && equivalence !=0) {
        return true;
    }
    else {
        return false;
    }

}
export default industrySkillValidation;
