import { useCookies } from 'react-cookie';


let testAdminUser = {id: 22, name: "Jurgen Holls", password: "pass", admin: true};
let testGeneralUser = {id: 25, name: "John Doe", password: "pass", admin: false};
let testPortfolioPreWork = {
    id: 2,
    name: "Stack Full Engineer",
    user: "John Doe",
    submitted: false,
    approved: false,
    reviewed: false,
    feedback: ""
}


export function AdminUserTestComponent() {
    const [cookies, setCookies] = useCookies();
    setCookies('admin', testAdminUser, {path: "/"});
    return <> </>;
}

export function GeneralUserTestComponent() {
    const [cookies, setCookies] = useCookies();
    setCookies('user', testGeneralUser, {path: "/"});
    return <> </>;
}