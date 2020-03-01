import React from 'react';
import Axios from 'axios';

export const uploadImageCB = (file) => {
    return new Promise((resolve, reject) => {
        Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/uploads/singleFile`,
            headers: {
                Authorization : `Bearer ${window.localStorage.getItem("access_token")}`
            },
            data: {
                image: file
            }
        })
        .then(({data}) => {
            resolve({data: data.file.secure_url})
        })
        .catch(err => reject(err));
    })
}

export const uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_API_ENDPOINT}/api/uploads/singleFile`);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("access_token")}`);
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          let res = {link: response.file.secure_url};
          console.log(res);
          resolve({data: res});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
}

export const restoreBlogAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog/disable/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

export const getBlogsAPI = (disable, query) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog${query ? `${query}&disable=${disable}` : `?disable=${disable}`}`
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

export const getBlogAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog/${id}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export const createBlogAPI = (data = {}) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            },
            data
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export const updateBlogAPI = (id, data = {}) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog/${id}`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            },
            data
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export const deleteBlogAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method :"DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog/delete/${id}`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const disableBlogAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method :"DELETE",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog/disable/${id}`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}