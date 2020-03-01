import React from 'react';

class Progress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0
        }
        this.loop = null;
    }

    onSetKeyFramesAnimation = (progress) => {
        document.styleSheets[0].insertRule(`@keyframes progressIn {from {width: 0 } to{width: ${progress}}}`)
    }

    componentWillMount() {
        this.onSetKeyFramesAnimation(this.props.progress);
    }

    render() {
        const { progress, title } = this.props;
        return (
            <div className="progress">
                <h2 className="progress__title"> {title} </h2>
                <div id="progress" style={{width: `${progress}%`, animation: "progressIn 800ms linear"}} className="progress__process">
                    <div className="progress__process__ratio"> {progress} </div>
                </div>
            </div>
        )
    }
}

export default Progress;