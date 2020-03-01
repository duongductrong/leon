import React from 'react';
import Aboutme from '../../../../components/UI/Aboutme/Aboutme'
import FollowMe from '../../../../components/UI/FollowMe/FollowMe';
import Subscribe from '../../../../components/UI/Subscribe/Subscribe';
import Trending from '../../../../components/UI/Trending/Trending';
//assets
import Avt from '../../../../assets/images/me.jpg';

class SideBar extends React.Component {
    render() {
        const { children } = this.props;
        const { className, style } = this.props;
        return (
            <div style={style} className={`sidebar${className ? " " + className : ""}`}>
                <Aboutme title="About me" 
                image={Avt} 
                description="Hello. I am a student of Ton Duc Thang Univerisy - College School. Currently, I am a sophomore, pursuing a programming industry. The language I use is javascript." />
                <FollowMe title="FOLLOW ME" />
                <Subscribe title="SUBSCRIBE TO NEWSLETTER" />
                <Trending title="TRENDING POSTS" />
            </div>
        )
    }
}

export default SideBar;