import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/delivery", 
    Headers: { "Content-Type": "application/json"}
})