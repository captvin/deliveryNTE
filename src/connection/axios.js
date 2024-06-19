import axios from "axios";

export default axios.create({
    baseURL: "http://10.110.13.29/BEDeliveryNTE/delivery", 
    Headers: { "Content-Type": "application/json"}
})