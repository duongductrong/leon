import React from 'react';
import { Button, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

export const columns = [
    {
        title: "ID",
        dataIndex: "_id",
        key: "_id"
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Message",
        dataIndex: "message",
        key: "message",
        width: 500
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email"
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: actions => (
            actions.map((action, index) => {
                return (
                    <span key={index} style={{margin: "0 3px"}}>
                        {
                            <Popconfirm
                            title="Are you sure about this action ?"
                            onConfirm={action["onFunc"]}>
                                <Button type="primary"> {action.name} </Button>
                            </Popconfirm>
                        }
                    </span>
                )
            })
        )
    }
]