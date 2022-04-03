import React, {Component} from "react";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

class Books extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size:0,
            page:2,
            books:props.books
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const bookss = this.getBooksPage(offset,nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Category</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookss}
                            </tbody>
                        </table>
                    </div>
                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new Book</Link>
                            </div>
                        </div>
                    </div>
                    <ReactPaginate previousLabel={"back"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="/#">...</a>}
                                   breakClassName={"break-me"}
                                   pageClassName={"ml-1"}
                                   pageCount={pageCount}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination m-4 justify-content-center"}
                                   activeClassName={"active"}/>
                </div>
            </div>
        );
    }
    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

    getBooksPage = (offset, nextPageOffset)=>{
        return this.props.books.map((term) => {
            return (
                <tr>
                    <td scope={"col"}>{term.name}</td>
                    <td scope={"col"}>{term.author.name}</td>
                    <td scope={"col"}>{term.category}</td>
                    <td scope={"col"} className={"text-right"}>
                        <a title={"Delete"} className={"btn btn-danger"}
                           onClick={()=>this.props.onDelete(term.id,this)}>Delete</a>
                        <Link onClick={()=>this.props.onEdit(term.id,this)}
                              to={`/books/edit/${term.id}`}
                              className={"btn btn-info"}>Edit
                        </Link>
                    </td>
                </tr>
            );
        })
    }
}


export default Books;