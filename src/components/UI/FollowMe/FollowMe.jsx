import React from 'react';
import WidgetTitle from '../WidgetTitle/WidgetTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

class FollowMe extends React.Component {
    render() {
        const { title, facebook, instagram, twitter, linkedin } = this.props;
        return (
            <div className="follow-me">
                <WidgetTitle left> { title } </WidgetTitle>
                <div className="follow-me__community">
                    <a className="follow-me__community__facebook" href={facebook} target="_blank">
                        <div><FontAwesomeIcon icon={faFacebookF} /></div>
                    </a>
                    <a className="follow-me__community__twitter" href={twitter} target="_blank">
                        <div><FontAwesomeIcon icon={faTwitter} /></div>
                    </a>
                    <a className="follow-me__community__ins" href={instagram} target="_blank">
                        <div><FontAwesomeIcon icon={faInstagram} /></div>
                    </a>
                    <a className="follow-me__community__linkedin" href={linkedin} target="_blank">
                        <div><FontAwesomeIcon icon={faLinkedin} /></div>
                    </a>
                </div>
            </div>
        )
    }
}

export default FollowMe;