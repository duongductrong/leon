import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { NavLink } from 'react-router-dom';

export const columns = [
    {
        title: "ID",
        dataIndex: "key",
        key: "key"
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
        title: "Position",
        dataIndex: "permission",
        key: "permission"
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: actions => (
            actions.map((action, i) => {

                return (
                    <span key={i} style={{margin: "0 3px"}}>
                        {
                            action["action"].toLowerCase() !== "edit" ?
                            <Popconfirm title={`Are you sure ${action["name"]} this user ?`}
                            onConfirm={action["onFunc"]} >
                                <Button type="primary"> {action["name"]} </Button>
                            </Popconfirm> : 
                            <NavLink to={action["href"]}>
                                <Button type="primary"> {action["name"]} </Button>
                            </NavLink>
                        }
                    </span>
                )
            })
        )
    },
]