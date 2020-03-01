import React from 'react';
import { Button, Popconfirm } from 'antd';

export const columns = [
    {
        title: "ID",
        dataIndex: "key",
        key: "key"
    },
    {
        title: "Label",
        dataIndex: "label",
        key: "label"
    },
    {
        title: "Url",
        dataIndex: "url",
        key: "url"
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: actions => (
            actions.map((action, i) => {
                return (
                    <Popconfirm
                        key={i}
                        title={`Are you sure ${action["name"]} this item ?`}
                        onConfirm={action["onFunc"]}
                    >
                        <Button type="primary" style={{margin: "0 2px"}}> {action["name"]} </Button>
                    </Popconfirm>
                )
            })
        )
    }
]

export const columnsSubmenu = [
    {
        title: "ID",
        dataIndex: "key",
        key: "key"
    },
    {
        title: "Label",
        dataIndex: "label",
        key: "label"
    },
    {
        title: "Url",
        dataIndex: "url",
        key: "url"
    },
    {
        title: "For menu",
        dataIndex: "menu",
        key: "menu"
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: actions => (
            actions.map((action, i) => {
                
                return (
                    <Popconfirm
                        key={`${i}`}
                        title={`Are you sure ${action["name"]} this item ?`}
                        onConfirm={action["onFunc"]}
                    >
                        <Button type="primary" style={{margin: "0 2px"}}> {action["name"]} </Button>
                    </Popconfirm>
                )
            })
        )
    }
]