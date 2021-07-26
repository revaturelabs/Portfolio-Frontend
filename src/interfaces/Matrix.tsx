import Portfolio from "./Portfolio";

export interface Matrix {
    id: number;
    portfolio: Portfolio;
    header: string;
}

export default interface Skill {
    id: number;
    matrix: Matrix;
    name: String;
    value: number;
}