import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMinus, faBars, faEnvelopeOpenText, faPhone, faSchool, faStickyNote, faGenderless } from '@fortawesome/free-solid-svg-icons'
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
import Avatar from '../../assets/images/me.jpg';
import Avt from '../../assets/images/mee.jpg'

const TimelineData = [
    {
        title: "EDUCATION",
        item: [
            {
                currently: true,
                date: "2018 - 2021",
                name: "Student of Ton Duc Thang University",
                location: "TON DUC THANG UNIVERSITY . HCM City",
                description: "Hiện tại mình là sinh viên trường TÔN ĐỨC THẮNG UNIVERSITY - HỆ CAO ĐẲNG. Tại khóa 2018 sẽ tốt nghiệp vào đầu năm 2021. Mình có học lực loại Khá, điểm tổng các môn hiện tại 8/10"
            }
        ]
    },
    {
        title: "EXPERIENCE",
        item: [
            {
                currently: false,
                date: "NOV 2019 - DEC 2019",
                name: "[Project] XSKILL STORE - SHOES STORE",
                location: "https://reactjs-xskillstore.firebaseapp.com/",
                description: "XSKILL-STORE - SHOES STORE là một trang web bán hàng với sản phẩm là giày. Trang có một số chức năng cơ bản như ĐĂNG NHẬP, ĐĂNG KÝ TÀI KHOẢN ,ĐẶT HÀNG, CHỌN LỌC MẶT HÀNG theo xem trước ảnh của sản phẩm, phân trang, viết blog giới thiệu sản phẩm. Trang web cũng có giao diện quản lý, thống kê bài viết, sản phẩm, đơn hàng, ngoài ra cũng có thể chỉnh sửa và xóa các đối tượng.",
                using: (
                    <ul>
                        <li>Frontend: ReactJS</li>
                        <li>Backend: Nodejs - Expressjs</li> 
                        <li>Database: MongoDB atlas</li>
                    </ul>
                )
            },
            {
                currently: true,
                date: "FEB 2020",
                name: "[Project] Leon Blog - Blog cá nhân",
                location: `${window.location.origin}`,
                description: (<div>
                    Leon blog là trang web về chủ đề blog. Mục đích dùng để chia sẻ kiến thức mình học được lên trang, cũng như dịch các bài blog có kiến thức liên quan đến ngôn ngữ Javascript.
                    Leon blog được mình xây dựng kèm theo trang giao diện quản lý sử dụng thư viện UI/Ant.design. <br /> <br />
                    Sau khi làm sản phẩm này mình có học được một số kiến thức mới
                    như sử dụng UI/ant.design để xây dựng UI/UX tốt hơn, quản lý Form/thông tin người dùng nhập vào và validate giá trị trước khi gửi yêu cầu lên SERVER API để giảm
                    bớt lượng yêu cầu dư thừa, áp dụng thuật toán phân trang
                </div>),
                using: (
                    <ul>
                        <li>Frontend: ReactJS / SCSS-BEM</li>
                        <li>Backend: Nodejs - Expressjs</li> 
                        <li>Database: MongoDB atlas</li>
                    </ul>
                )
            }
        ]
    }
]

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
                                <Progress title="HTML5" progress={100} />
                                <Progress title="CSS3" progress={90} />
                                <Progress title="JAVASCRIPT" progress={70} />
                                <Progress title="SASS" progress={60} />
                                <Progress title="REACTJS" progress={70} />
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