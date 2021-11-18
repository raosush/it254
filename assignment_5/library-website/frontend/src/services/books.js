import axios from "axios";
import { SERVER_URL } from "../config";
const baseUrl = SERVER_URL + "/books/";

const getBook = async(id) => {
    const response = await axios.get(baseUrl + id);
    return response.data;
}

const postNewBook = async (data) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
}

const putUpdateBook = async (id, data) => {
    const response = await axios.put(baseUrl + id, data);
    return response.data;
}

const deleteBook = async (id) => {
    const response = await axios.delete(baseUrl + id);
    return response.data;
}

const searchBooks = async (bookName, authorName) => {
    const response = await axios.get(baseUrl + `?bookName=${bookName}&authorName=${authorName}`);
    return response.data;
}

export { getBook, postNewBook, putUpdateBook, deleteBook, searchBooks };
