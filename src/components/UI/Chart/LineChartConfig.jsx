import React from 'react';
import { 
    LineChart,
    Line, // * Line performance
    XAxis, // * X Axis
    YAxis, // * Y Axis
    CartesianGrid,
    Legend,
    Tooltip
} from 'recharts';

function LineChartConfig(props) {
    
    let staticData = [
        {name: 'Blog', like: 4000, dislike: 2400, wow: 2400},
        {name: 'User', like: 3000, dislike: 1398, wow: 2210},
        {name: 'Category', like: 2000, dislike: 9800, wow: 2290},
        {name: 'Comments', like: 2780, dislike: 3908, wow: 2000},
        {name: 'Contacts', like: 1890, dislike: 4800, wow: 2181}
    ];

    return (
        <LineChart
        width={800}
        height={500}
        data={staticData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="1 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="like" stroke="black" />
            <Line type="monotone" dataKey="dislike" stroke="red" />
            <Line type="monotone" dataKey="wow" stroke="green" />
        </LineChart>
    )
}

export default LineChartConfig;