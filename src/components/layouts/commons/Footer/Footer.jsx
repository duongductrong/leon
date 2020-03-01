import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

//assets
import Logo from '../../../../assets/images/impose-logo.png'
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer__brand">
                    <NavLink to="/">
                        <img src={Logo} className="footer__brand__logo" />
                    </NavLink>
                    <h3 className="footer__brand__title">JUST LIVING THE LIFE AS IT GOES BY</h3>
                </div>
                <div className="footer__community">
                    <a className="footer__community__facebook" href="https://www.facebook.com/trong.duong.77398" target="_blank">
                        <div><FontAwesomeIcon icon={faFacebookF} /></div>
                    </a>
                    <a className="footer__community__twitter" href="/" target="_blank">
                        <div><FontAwesomeIcon icon={faTwitter} /></div>
                    </a>
                    <a className="footer__community__ins" href="/" target="_blank">
                        <div><FontAwesomeIcon icon={faInstagram} /></div>
                    </a>
                    <a className="footer__community__linkedin" href="/" target="_blank">
                        <div><FontAwesomeIcon icon={faLinkedin} /></div>
                    </a>
                </div>
            </div>
        )
    }
}

export default Footer;