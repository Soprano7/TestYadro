import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";


export const fetchItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};


export const fetchItemById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};