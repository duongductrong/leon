import React from 'react';
import Axios from 'axios';

export const createNav = (data = {}) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/menuItem`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            },
            data
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const createSubmenu = (data = {}) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/subMenu`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            },
            data
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const fetchAPIMenu = (id = "") => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/menuItem${id ? `/${id}` : "?onpage=9999"}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const fetchAPISubMenu = (id = "") => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/subMenu${id ? `/${id}` : "?onpage=9999"}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const postApiCreateSubmenu = data => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/submenu`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            },
            data
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const putApiCreateSubmenu = (id, data) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/submenu/${id}`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            },
            data
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}