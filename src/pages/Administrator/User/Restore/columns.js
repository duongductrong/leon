import React from 'react';
import { Button, Popconfirm, Tag } from 'antd';

export const columns = [
    {
        title: "ID",
        dataIndex: "_id",
        key: "_id"
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username"
    },
    {
        title: "Firstname",
        dataIndex: "firstname",
        key: "firstname"
    },
    {
        title: "Lastname",
        dataIndex: "lastname",
        key: "lastname"
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: actions => (
            actions.map(action => (
                <Popconfirm
                title="Are you sure restore this category ?"
                onConfirm={action.onFunc}>
                    <Button type="primary"> {action.name} </Button>
                </Popconfirm>
            ))
        )
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: status => <Tag color="red"> {status} </Tag>
    }
]