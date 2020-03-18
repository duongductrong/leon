import React from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';

export const fetchImages = async (url) => {
    return new Promise((resolve, reject) => {
        Axios({
            method: "GET",
            url: url
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

export const deleteImageAPI = async (id) => {
    return new Promise((resolve, reject) => {
        Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/uploads/deleteSingle`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            },
            data: {
                public_id: id
            }
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}