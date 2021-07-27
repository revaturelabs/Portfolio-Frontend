import Portfolio from "./Portfolio";

export default interface Matrix {
    id: number;
    portfolio: Portfolio;
    header: String;
    skills: Array<Skill>;
}

export interface Skill {
    id: number;
    name: String;
    value: number;
}