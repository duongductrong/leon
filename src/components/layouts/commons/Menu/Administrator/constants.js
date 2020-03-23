import React from 'react';
import Cookies from 'js-cookie';

export const SiderMenu = [
    {
        id: "yourwebsite", 
        kind: "default", 
        name: "Your Website", 
        icon: "home", 
        url: "/" ,
        submenu: [] 
    },
    {
        id: "dashboard", 
        kind: "default", 
        name: "Dashboard", 
        icon: "bars" , 
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
        icon: "book" , 
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
        icon: "user" , 
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
        icon: "tags" , 
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
        icon: "contacts" , 
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
        icon: "form" , 
        url: null , 
        submenu: [
            {
                name: "View", 
                url: "/administrator/comment"
            },
            {
                name: "Create", 
                url: "/administrator/comment/new"
            }
        ] 
    },
    {
        id: "menu", 
        kind: "system", 
        name: "Menu", 
        icon: "unordered-list", 
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
        icon: "copyright" , 
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
        icon: "logout", 
        url: null, 
        submenu: [], onFunc: () => {
            Cookies.remove("access_token")
            window.location.reload()
        } 
    }
];