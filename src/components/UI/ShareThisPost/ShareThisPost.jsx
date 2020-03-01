import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

class ShareThisPost extends React.Component {
    render() {
        const { facebook, twitter, instagram, linkedin, title } = this.props;
        const { style, className } = this.props;
        return (
            <div style={style} className={`share-this-post${className ? " " + className : ""}`}>
                <h1 className="share-this-post__title"> {title} </h1>
                <div className="share-this-post__community">
                    <a className="share-this-post__community__facebook" href={`https://www.facebook.com/sharer.php?u=${facebook}`} target="_blank">
                        <div><FontAwesomeIcon icon={faFacebookF} /></div>
                    </a>
                    <a className="share-this-post__community__twitter" href={twitter} target="_blank">
                        <div><FontAwesomeIcon icon={faTwitter} /></div>
                    </a>
                    <a className="share-this-post__community__ins" href={instagram} target="_blank">
                        <div><FontAwesomeIcon icon={faInstagram} /></div>
                    </a>
                    <a className="share-this-post__community__linkedin" href={linkedin} target="_blank">
                        <div><FontAwesomeIcon icon={faLinkedin} /></div>
                    </a>
                </div>
            </div>
        )
    }
}

export default ShareThisPost;