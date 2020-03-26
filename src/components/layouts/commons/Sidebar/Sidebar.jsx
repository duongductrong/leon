import React from 'react';
import Aboutme from '../../../../components/UI/Aboutme/Aboutme'
import FollowMe from '../../../../components/UI/FollowMe/FollowMe';
import Subscribe from '../../../../components/UI/Subscribe/Subscribe';
import Trending from '../../../../components/UI/Trending/Trending';
//assets
import Avt from '../../../../assets/images/avatar_1.jpg';

class SideBar extends React.Component {
    render() {
        const { children } = this.props;
        const { className, style } = this.props;
        return (
            <div style={style} className={`sidebar${className ? " " + className : ""}`}>
                <Aboutme title="About me" 
                image={Avt} 
                description="Hello. I am a student of Ton Duc Thang Univerisy - College School. Currently, I am a sophomore, pursuing a programming industry. The language I use is javascript." />
                <FollowMe title="FOLLOW ME" content={{
                    facebook: "https://www.facebook.com/trong.duong.77398",
                    instagram: "https://www.instagram.com/_duongductrong/",
                    linkedin: "https://www.linkedin.com/in/d%C6%B0%C6%A1ng-%C4%91%E1%BB%A9c-tr%E1%BB%8Dng-2098461a0/"
                }} />
                <Subscribe title="SUBSCRIBE TO NEWSLETTER" />
                <Trending title="TRENDING POSTS" />
            </div>
        )
    }
}

export default SideBar;