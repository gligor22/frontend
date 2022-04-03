
import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Redirect , Route} from "react-router-dom";
import Authors from "../Authors/authors";
import BookRepository from "../../repository/BookRepository";
import Categories from "../Categories/categories";
import ListBooks from "../Books/ListBooks/ListBooks";
import Header from "../Header/header";
import BookAdd from "../Books/AddBook/BookAdd";
import data from "bootstrap/js/src/dom/data";
import BookEdit from "../Books/EditBook/BookEdit";

class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            books: [],
            authors:[],
            categories:[],
            selectedBook: {}
        }
    }

    componentDidMount() {
        this.loadAuthors();
        this.loadCategories();
        this.loadBooks();
    }

    render() {
        return (
            <div>
                <Router>
                    <Header/>
                    <main>
                        <div className="container">
                            <Route exact path={"/authors"} render={() => <Authors authors={this.state.authors}/>}/>
                            <Route path={"/categories"} exact render={() => <Categories categories={this.state.categories}/>}/>
                            <Route path={"/books/add"} exact render={()=><BookAdd
                                authors={this.state.authors} categories={this.state.categories}/>} onAdd={this.addBook}/>
                            <Route path={"/books/edit/:id"} exact render={()=><BookEdit
                                authors={this.state.authors} categories={this.state.categories} book={this.state.selectedBook}/>}
                                   onEdit={this.editBook}/>
                            <Route path={"/books"} exact render={() => <ListBooks books={this.state.books}/>}
                                   onDelete={this.deleteBook} onEdit={this.getBook}/>
                            {/*<Redirect to={"/books"}/>*/}
                        </div>
                    </main>
                </Router>
            </div>
        );
    }

    loadAuthors = () =>
    {
        BookRepository.fetchAuthors().then((data)=>{
            this.setState({
                authors:data.data
            })
        })
    }

    loadCategories=()=>{
        BookRepository.fetchCategories().then((data)=>{
            this.setState({
                categories: data.data
            })
        })
    }

    loadBooks=()=>{
        BookRepository.fetchBooks().then((data)=>{
            this.setState({
                books:data.data
            })
        })
    }

    deleteBook = (id) =>{
        BookRepository.deleteBook(id).then(()=>{
            this.loadBooks();
        })
    }

    addBook=(name,availableCopies, category, author)=>{
        BookRepository.addBook(name,availableCopies,category,author).then(()=>{
            this.loadBooks();
        })
    }

    getBook=(id)=>{
        BookRepository.getBook(id).then((data)=>{
            this.setState({
                selectedBook: data.data
            })
        })
    }
    editBook=(id,name,availableCopies, category, author)=>{
        BookRepository.editBook(id,name,availableCopies, category, author).then(()=>{
            this.loadBooks();
        })
    }
}

export default App;
