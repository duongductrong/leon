import React from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

export const getCommentsAPI = (query) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/comments${query}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const disableCommentAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/comments/disable/${id}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const deleteCommentAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/comments/delete/${id}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}