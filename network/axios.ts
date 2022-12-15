import axios from "axios";

const mainAxios = axios.create({
    baseURL: "https://my-json-server.typicode.com/benirvingplt/"
})

export default mainAxios;