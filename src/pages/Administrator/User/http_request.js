import React from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

export const getUserListAPI = (disable = false, query = "") => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users${query ? `${query}&disable=${disable}` : `?disable=${disable}`}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export const getUserAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/${id}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const createUserAPI = (data) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users`,
            data,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const updateUserAPI = (id, data) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/${id}`,
            data,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const disableUserAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/disable/${id}`,
            headers: {
                Authorization : `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const deleteUserAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/delete/${id}`,
            headers: {
                Authorization : `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}