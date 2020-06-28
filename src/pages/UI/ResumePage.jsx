import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faPhone, faSchool, faStickyNote, faGenderless } from '@fortawesome/free-solid-svg-icons'
import {  faGithub } from '@fortawesome/free-brands-svg-icons'
import LayoutMedium from '../../components/layouts/commons/LayoutMedium/LayoutMedium'
import GridLayout73 from '../../components/layouts/commons/GridLayout/GridLayout73';
import Timeline from '../../components/UI/Timeline/Timeline';
import TimelineItem from '../../components/UI/Timeline/Timeline.Item';
import TimelineTitle from '../../components/UI/Timeline/Timeline.Title';
import Button from '../../components/UI/Button/Button';
import Progress from '../../components/UI/Progress/Progress';
import Testimonial from '../../components/UI/Testimonial/Testimonial';

import Avt from '../../assets/images/mee.jpg'
import { timelinejson } from '../../assets/json/timeline';

const TimelineData = timelinejson;

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

    UNSAFE_componentWillMount() {
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
                                {
                                    TimelineData.map((timelime, i) => (
                                        <React.Fragment key={"timelime-" + i}>
                                            <TimelineTitle> {timelime.title} </TimelineTitle>
                                            {
                                                timelime.item && timelime.item.map(({date, name, location, description, using, currently}, i) => (
                                                    <TimelineItem
                                                    date={date}
                                                    name={name}
                                                    location={location}
                                                    description={description}
                                                    using={using}
                                                    currently={currently} />
                                                ))
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </Timeline>
                                <a href="https://www.linkedin.com/in/d%C6%B0%C6%A1ng-%C4%91%E1%BB%A9c-tr%E1%BB%8Dng-2098461a0" target="__blank"> <Button>MY LINKEDIN PROFILE</Button> </a>
                        </div>
                        <div>
                            <SideResumeProgress title="ABOUT ME">
                                <Testimonial 
                                image={Avt}
                                name="DUONG DUC TRONG"
                                location="STUDENT">
                                    <FontAwesomeIcon icon={faGenderless} /> <strong>Name</strong> : Dương Đức Trọng <br />
                                    <FontAwesomeIcon icon={faGenderless} /> <strong>Gender</strong> : Nam <br />
                                    <FontAwesomeIcon icon={faEnvelopeOpenText} /> <strong>Email</strong> : duongductrong06@gmail.com <br />
                                    <FontAwesomeIcon icon={faPhone} /> <strong>Phone</strong> : 0946848122 <br />
                                    <FontAwesomeIcon icon={faGithub} /> <strong>Github</strong>: <a href="https://github.com/duongductrong" target="__blank">https://github.com/duongductrong</a> <br/>
                                    <FontAwesomeIcon icon={faSchool} /> <strong>SCHOOL</strong> : TON DUC THANG UNIVERSITY - COLLEGE <br />
                                    <FontAwesomeIcon icon={faStickyNote} /> Xin tự giới thiệu, hiện tại mình là sinh viên trường TÔN ĐỨC THẮNG UNIVERSITY - HỆ CAO ĐẲNG. 
                                    Mình học chuyên ngành về lập trình web, mong muốn của mình trở thành một FrontEnd Developer <br />
                                </Testimonial>
                            </SideResumeProgress>
                            <SideResumeProgress title="FRONTEND DEVELOPER SKILLS">
                                <Progress title="HTML5" progress={90} />
                                <Progress title="CSS3" progress={80} />
                                <Progress title="JAVASCRIPT" progress={70} />
                                <Progress title="SASS" progress={60} />
                                <Progress title="ReactJS/Redux" progress={65} />
                                <Progress title="VueJS/VueX" progress={50} />
                                <Progress title="Angular" progress={50} />
                            </SideResumeProgress>
                            <SideResumeProgress title="BACKEND DEVELOPER SKILLS">
                                <Progress title="NODEJS/EXPRESSJS" progress={70} />
                                <Progress title="MONGODB" progress={80} />
                            </SideResumeProgress>
                            <SideResumeProgress title="DESIGN SKILLS">
                                <Progress title="PHOTOSHOP" progress={70} />
                            </SideResumeProgress>
                            <SideResumeProgress title="ENGLISH FOR READING DOCUMENT">
                                {/* <Progress title="READING" progress={40} />
                                <Progress title="LISTENING" progress={40} /> */}
                            </SideResumeProgress>
                        </div>
                    </GridLayout73>
                </div>
            </LayoutMedium>
        )
    }
}

export default ResumePage;