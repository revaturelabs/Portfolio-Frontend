import Portfolio from "./Portfolio";

export default interface Education {
    id: number;
    portfolio: Portfolio;
    university: string;
    degree: string;
    graduationDate: string;
    gpa: number;
    logoUrl: string;
}

