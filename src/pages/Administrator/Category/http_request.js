import React from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

export const getCategoriesAPI = async (disable, query) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/categories${query ? `${query}&disable=${disable}` : `?disable=${disable}`}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export const getCategoryAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/categories/${id}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export const createCategoryAPI = (data) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/categories`,
            data: data,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export const updateCategoryAPI = (id, data) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/categories/${id}`,
            data: data,
            headers: {
                Authorization : `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export const deleteCategoryAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/categories/delete/${id}`,
            headers: {
                Authorization : `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
} 

export const disableCategoryAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/categories/disable/${id}`,
            headers: {
                Authorization : `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
} 