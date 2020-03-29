import React from 'react';
import { Result } from 'antd';
import LineChartConfig from '../../components/UI/Chart/LineChartConfig';

class OverviewPage extends React.Component {
    render() {
        return (
            <div className="overview-page">
                <Result
                title="Hệ thống đang được xây dựng"
                status="warning"
                subTitle="The system is under construction" />
                <div className="overview-page__analytics" style={{display: "flex", justifyContent: "center"}}>
                    <LineChartConfig />
                </div>
            </div>
        )
    }
}

export default OverviewPage;