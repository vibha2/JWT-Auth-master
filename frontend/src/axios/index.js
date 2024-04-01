import axios from "axios";

const _baseURL = "http://localhost:4000";

const axios_api = axios.create({
    baseURL : _baseURL + "/api/v1/",
});

export default axios_api;