import React from 'react';
import { Result } from 'antd';

class OverviewPage extends React.Component {
    render() {
        return (
            <div className="overview-page">
                <Result
                title="Hệ thống đang được xây dựng"
                status="warning"
                subTitle="The system is under construction" />
            </div>
        )
    }
}

export default OverviewPage;