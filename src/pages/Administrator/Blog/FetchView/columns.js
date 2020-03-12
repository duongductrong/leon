import React from 'react';
import { Button, Menu, Dropdown, Icon, Popconfirm, message } from 'antd';
import Text from 'antd/lib/typography/Text';
import { NavLink } from 'react-router-dom';

export const columns = [
    {
        title: "ID",
        dataIndex: "key",
        key: "key",
        width: "15%"
    },
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "25%",
        render: title => (
            <a href={`/blog/${title.url}`}> {title["name"].length < 200 ? title["name"] : title["name"].slice(0, 200) + "..."} </a>
        )
    },
    {
        title: "Categories",
        dataIndex: "categories",
        key: "categories",
        render: categories => {
            const values = (
                <Menu>
                    {
                        categories.map((e, i) => (
                            <Menu.Item key={i}>
                                <a target="_blank" rel="noopener noreferrer" href="/">
                                    {e.name}
                                </a>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            );
            return (
                <Dropdown overlay={values}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Hover to show <Icon type="down" />
                    </a>
                </Dropdown>
            )
        }
    },
    {
        title: "Author",
        dataIndex: "author",
        key: "author",
        render:  user => {
            return (
                <Text>{user.username}</Text>
            )
        }
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
                            title="Are you sure delete this post?"
                            onConfirm={e["onFunc"]}>
                                <Button type="primary"> {e.name} </Button>
                            </Popconfirm> :
                            <NavLink style={{color: "white"}} to={e["href"]}> <Button onClick={e["onFunc"]} type="primary">{e.name}</Button> </NavLink>
                        }
                    </span>
                )
            })
        )
    }
]