import Portfolio from "./Portfolio";

export default interface Certification {
    id: number;
    portfolio: Portfolio;
    name: string;
    certId: string;
    issuedBy: string;
    issuedOn: string;
    publicUrl: string;
}
