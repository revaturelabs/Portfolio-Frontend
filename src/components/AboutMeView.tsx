import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/RevatureAboutMe.css';
import { Card } from 'react-bootstrap';

interface AboutMe {
    id: number;
    bio: String;
    email: String;
    phone: String;
    // portfolio: portfolio object
}

const AboutMeView = () => {
    const [aboutMe, setAboutMe] = useState<AboutMe>();

    useEffect(() => {
        axios.get<AboutMe>(`http://3.236.213.150:8081/aboutMe`).then(response => {
            console.log(response.data);
            setAboutMe(response.data);
        })
    }, [null]);

    const renderAboutMe = (aboutMeList: AboutMe) => {
        return (
            <div>
                {aboutMe?.bio}<br />
                {aboutMe?.email} <br />
                {aboutMe?.phone} <br />
            </div>
        );
    }

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>About Me</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {aboutMe && renderAboutMe(aboutMe)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AboutMeView;