import React from 'react';
import { Button, Popconfirm, Tag } from 'antd';

//Restore API for RestoreBlogPage
export const columnsRestoreBlog = [
    {
        title: "ID",
        dataIndex: "_id",
        key: "_id"
    },
    {
        title: "Title",
        dataIndex: "title",
        key: "title"
    },
    {
        title: "Created",
        dataIndex: "created",
        key: "created"
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: actions => (
            actions.map(action => {
                return (
                    <Popconfirm
                    title="Are you sure?"
                    onConfirm={action.onFunc}
                    >
                        <Button type="primary"> {action.name} </Button>
                    </Popconfirm>
                )
            })
        )
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: status => (<Tag color="red"> {status} </Tag>)
    }
]