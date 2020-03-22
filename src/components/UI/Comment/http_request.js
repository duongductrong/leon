import React from 'react';
import Axios from 'axios';

export const createCommentAPI = (data) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/comments`,
            data: data
        }).then(res => resolve(res)).catch(err => reject(err));
    })
}

export const getCommentsAPI = (query = "") => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/comments${query}`
        }).then(res => resolve(res)).catch(err => reject(err));
    })
}