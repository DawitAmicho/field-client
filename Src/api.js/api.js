import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" }); // Change to Render/Heroku URL after deploying backend!
export default API;