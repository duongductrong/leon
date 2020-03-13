import React from 'react';
import {
    HomeOutlined, 
    BarsOutlined,
    BookOutlined,
    UserOutlined,
    TagsOutlined,
    ContactsOutlined,
    FormOutlined,
    UnorderedListOutlined,
    CopyrightOutlined,
    LogoutOutlined
} from '@ant-design/icons'

export const SiderMenu = [
    {
        id: "yourwebsite", 
        kind: "default", 
        name: "Your Website", 
        icon: <HomeOutlined />, 
        url: "/" ,
        submenu: [] 
    },
    {
        id: "dashboard", 
        kind: "default", 
        name: "Dashboard", 
        icon: <BarsOutlined /> , 
        url: null , 
        submenu: [
            {
                name: "View", 
                url: "/administrator"
            },
            {
                name: "Create", 
                url: "/administrator"
            }
        ] 
    },
    {
        id: "yourblog", 
        kind: "blog", 
        name: "Your Blog", 
        icon: <BookOutlined /> , 
        url: null , 
        submenu: [
            {
                name: "View", 
                url: "/administrator/blog"
            },
            {
                name: "Create", 
                url: "/administrator/blog/new"
            },
            {
                name: "Restore",
                url: "/administrator/blog/restore"
            }
        ] 
    },
    {
        id: "users", 
        kind: "blog", 
        name: "Users", 
        icon: <UserOutlined /> , 
        url: null , 
        submenu: [
            {
                name: "View", 
                url: "/administrator/user"
            },
            {
                name: "Create", 
                url: "/administrator/user/new"
            },
            {
                name: "Restore",
                url: "/administrator/user/restore"
            }
        ] 
    },
    {
        id: "category", 
        kind: "blog", 
        name: "Category", 
        icon: <TagsOutlined /> , 
        url: null , 
        submenu: [
            {
                name: "View", 
                url: "/administrator/category"
            },
            {
                name: "Create", 
                url: "/administrator/category/new"
            },
            {
                name: "Restore",
                url: "/administrator/category/restore"
            }
        ] 
    },
    {
        id: "contact", 
        kind: "blog", 
        name: "Contact", 
        icon: <ContactsOutlined /> , 
        url: null , 
        submenu: [
            {
                name: "View", 
                url: "/administrator"
            },
            {
                name: "Create", 
                url: "/administrator"
            }
        ] 
    },
    {
        id: "comments", 
        kind: "blog", 
        name: "Comments", 
        icon: <FormOutlined /> , 
        url: null , 
        submenu: [
            {
                name: "View", 
                url: "/administrator"
            },
            {
                name: "Create", 
                url: "/administrator"
            }
        ] 
    },
    {
        id: "menu", 
        kind: "system", 
        name: "Menu", 
        icon: <UnorderedListOutlined />, 
        url: null, 
        submenu: [
            {
                name: "View", 
                url: "/administrator/system/menu"
            }
        ] 
    },
    {
        id: "license", 
        kind: "system", 
        name: "License", 
        icon: <CopyrightOutlined /> , 
        url: null , 
        submenu: [
            {
                name: "View", 
                url: "/administrator"
            }
        ] 
    },
    {
        id: "logout", 
        kind: "blog", 
        name: "Logout", 
        icon: <LogoutOutlined />, 
        url: null, 
        submenu: [], onFunc: () => {
            window.localStorage.removeItem("access_token")
            window.location.reload()
        } 
    }
];