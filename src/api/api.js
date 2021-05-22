import axios from "axios"

export const API = axios.create({
    baseURL: "https://recipes-api-api-api.herokuapp.com",
})

export const API_ROUTER = {
    getPosts: {
        method: "GET",
        url: "/posts/",
    },
    addPost: {
        method: "POST",
        url: "/posts",
        headers: {
            "Content-Type": 'application/json',
            "Accept": "*/*"
        },
    },
    updateViews: {
        method: "PUT",
        url: "/posts/update/views/",
        headers: {
            "Content-Type": 'application/json'
        },
    },
    updateComments: {
        method: "PUT",
        url: "/posts/update/comments/",
        headers: {
            "Content-Type": 'application/json'
        },
    },

    search: {
        method: "GET",
        url: "/search/"
    },

    searchTags: {
        method: "GET",
        url: "/search/tags/"
    },

    searchDate: {
        method: "GET",
        url: "/search/date/"
    }
}