import axios from "axios";

export const api = axios.create({baseURL: `https://dumbmerchbe.herokuapp.com/api/v1/` });
