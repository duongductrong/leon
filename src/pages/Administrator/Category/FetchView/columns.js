import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { NavLink } from 'react-router-dom';

export const columnsSource = [
    {
        title: "ID",
        dataIndex: "key",
        key: "key"
    },
    {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: 'CREATED',
        dataIndex: 'created',
        key: 'created',
    },
    {
        title: "ACTION",
        dataIndex: 'action',
        key: 'action',
        render: actions => (
            //actions is array
            /* element of action is Object = {
                name: name,
                onFunc: onFunc
                url: url
            } */
            actions && actions.map((e,i) => {
                return (
                    <span key={i} style={{margin: "0 3px"}}>
                        {
                            e["action"].toLowerCase() !== "edit" ?
                            <Popconfirm
                            title="Are you sure delete this category"
                            onConfirm={e["onFunc"]}>
                                <Button type="primary"> {e.name} </Button>
                            </Popconfirm> :
                            <NavLink to={e["href"]}> <Button type="primary"> {e.name} </Button> </NavLink>
                        }
                    </span>
                )
            })
        )
    }
];