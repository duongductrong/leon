import React from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

export const FetchNavigationBuilt = () => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/buildingMenu`
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const FetchMenuItem = (query) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/menuItem${query}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const fetchSubmenu = (query = "") => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/subMenu${query}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const disableMenu = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/menuItem/disable/${id}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

export const deleteMenu = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/menuItem/delete/${id}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

export const disableSubmenu = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/subMenu/disable/${id}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

export const deleteSubmenu = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/subMenu/delete/${id}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}