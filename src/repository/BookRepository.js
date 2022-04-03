import axios from '../costum-axios/axios';

const BookService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchAuthors: () => {
        return axios.get("/authors/");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name,availableCopies, category, author) => {
        return axios.post("/books/add", {
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies,
        });
    },
    editBook: (id, name,availableCopies, category, author) => {
        return axios.put(`/books/edit/${id}`, {
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies,
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    }
}

export default BookService;
