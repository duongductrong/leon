import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMinus, faBars, faEnvelopeOpenText, faPhone, faSchool, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import LayoutMedium from '../../components/layouts/commons/LayoutMedium/LayoutMedium'
import GridLayout73 from '../../components/layouts/commons/GridLayout/GridLayout73';
import Timeline from '../../components/UI/Timeline/Timeline';
import TimelineItem from '../../components/UI/Timeline/Timeline.Item';
import TimelineTitle from '../../components/UI/Timeline/Timeline.Title';
import Button from '../../components/UI/Button/Button';
import Progress from '../../components/UI/Progress/Progress';
import Testimonial from '../../components/UI/Testimonial/Testimonial';

//assets
import Avatar from '../../assets/images/avt.jpg'

export const SideResumeProgress = ({title, children}) => {
    return (
        <div className="resume-page__side__progress">
            <h1 className="resume-page__side__progress__title"> {title} </h1>
            { children }
        </div>
    )
}

class ResumePage extends React.Component {

    onLoadedToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: "smooth" });
    }

    componentWillMount() {
        this.onLoadedToTop();
    }

    componentDidMount() {
        document.title = "Resume - Leon"
    }
    
    render() {
        return (
            <LayoutMedium>
                <div className="resume-page">
                    <h1 className="resume-page__title"> Resume </h1>
                    <GridLayout73 className="resume-page__wrapper">
                        <div>
                            <Timeline>
                                <TimelineTitle>EDUCATION</TimelineTitle>
                                <TimelineItem
                                date="2018"
                                name="High School Graduation"
                                location="TAN HIEP - KIEN GIANG"
                                description="I am currently a middle school student"/>
                                <TimelineItem
                                date="2018 - 2021"
                                name="Student of Ton Duc Thang University"
                                location="TON DUC THANG UNIVERSITY . HCM City"
                                description="I am a student of Ton Duc Thang University - College. Specialized in Information Technology, specializing in website programming - Front end Developers"
                                currently />
                                <TimelineTitle>EXPERIENCE</TimelineTitle>
                                <TimelineItem
                                date="NOV 2019 - DEC 2019"
                                name="[Project] XSKILL STORE - SHOES TORE"
                                location="https://reactjs-xskillstore.firebaseapp.com/"
                                description="I use Reactjs for Frontend, Nodejs Framework Expressjs for Backend, The data container is mongo atlas" />
                                <TimelineItem
                                date="FEB 2020"
                                name="[Project] Hey, Bro! Blog"
                                location={window.location.href}
                                description="Frontend: React - UI/Admin: Ant.design - UI/Template: Self build, Backend: Nodejs - Expressjs, Database: Mongo atlas"
                                currently />
                            </Timeline>
                                <a href="https://www.linkedin.com/in/d%C6%B0%C6%A1ng-%C4%91%E1%BB%A9c-tr%E1%BB%8Dng-2098461a0" target="__blank"> <Button>MY LINKEDIN PROFILE</Button> </a>
                        </div>
                        <div>
                            <SideResumeProgress title="ABOUT ME">
                                <Testimonial 
                                image={Avatar}
                                name="DUONG DUC TRONG"
                                location="STUDENT">
                                    <FontAwesomeIcon icon={faEnvelopeOpenText} /> Email : duongductrong06@gmail.com <br />
                                    <FontAwesomeIcon icon={faPhone} /> Phone : 0946848122 <br />
                                    <FontAwesomeIcon icon={faGithub} /> Github: <a href="https://github.com/trong06" target="__blank">https://github.com/trong06</a> <br/>
                                    <FontAwesomeIcon icon={faSchool} /> SCHOOL : TON DUC THANG UNIVERSITY - COLLEGE <br />
                                    <FontAwesomeIcon icon={faStickyNote} /> I am a student of Ton Duc Thang University - College. Specialized in Information Technology, specializing in website programming - Front end Developers <br />
                                </Testimonial>
                            </SideResumeProgress>
                            <SideResumeProgress title="FRONTEND DEVELOPER SKILLS">
                                <Progress title="HTML5" progress={100} />
                                <Progress title="CSS3" progress={90} />
                                <Progress title="JAVASCRIPT" progress={80} />
                                <Progress title="SASS" progress={60} />
                                <Progress title="REACTJS" progress={70} />
                            </SideResumeProgress>
                            <SideResumeProgress title="BACKEND DEVELOPER SKILLS">
                                <Progress title="NODEJS" progress={70} />
                                <Progress title="MONGODB" progress={80} />
                            </SideResumeProgress>
                            <SideResumeProgress title="DESIGN SKILLS">
                                <Progress title="PHOTOSHOP" progress={70} />
                            </SideResumeProgress>
                            <SideResumeProgress title="ENGLISH FOR READING DOCUMENT">
                                {/* <Progress title="READING" progress={40} />
                                <Progress title="LISTENING" progress={40} /> */}
                            </SideResumeProgress>
                            
                            { //Demo -> Waiting server build Resume 
                                /* <SideResumeProgress title="TESTIMONIALS">
                                    <Testimonial 
                                    image="http://themes.pixelwars.org/impose/wp-content/uploads/2015/11/testo-01.jpg"
                                    name="Vincent Wood"
                                    location="CEO / Gravity Inc."
                                    description="He is a great and hardworking guy. I am so proud of i have him as my asistant. He helped me so much. Also i am so proud of i have him as my asistant. He helped me so much." />
                                </SideResumeProgress> */
                            }
                        </div>
                    </GridLayout73>
                </div>
            </LayoutMedium>
        )
    }
}

export default ResumePage;