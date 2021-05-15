import axios from "axios"

export const API = axios.create({
    baseURL: "https://recipes-api-api-api.herokuapp.com/",
})

export const API_ROUTER = {
    getPosts: {
        method: "GET",
        url: "/posts/",
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
    }
}