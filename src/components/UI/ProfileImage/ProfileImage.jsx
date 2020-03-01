import React from 'react';

class ProfileImage extends React.Component {
    constructor(props) {
        super(props);
        
        this.presentMySkill = [
            "Coder",
            "Blogger",
            "Welcome !!!"
        ];

        this.initLoop = null;

        this.state = {
            skill: 0
        }
    }

    componentDidMount() {
        let init = 0;
        let pmsLength = this.presentMySkill.length;
        //increase first
        init += 1;
        //loop increase
        this.initLoop = setInterval(() => {
            if(init >= pmsLength) {
                init = 0;
            }
            this.setState({skill: init});
            init += 1;
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.initLoop);
    }

    render() {
        const { image } = this.props;
        const { skill } = this.state;

        return (
            <div className="profile-image">
                <div className="profile-image__avatar">
                    <img src={image} className="profile-image__avatar__child" />
                </div>
                <h1 className="profile-image__introduction profile-image--bigSize">Hi.</h1>
                <h2 className="profile-image__present profile-image--normalSize">Hey, Bro !</h2>
                <h2 className="profile-image__present profile-image--normalSize">
                    {/* I am a  */}
                    { this.presentMySkill.map((mySkil, i) => (
                        skill === i && <p key={`${i}-ProfileImage`} className="profile-image__present__skill profile-image--boldStyle"> {mySkil} </p>
                    )) }
                </h2>
            </div>
        )
    }
}

export default ProfileImage;