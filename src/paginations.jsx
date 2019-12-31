import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
};

const defaultProps = {
    initialPage: 1
};
export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var items = this.props.items;
        var pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(items.length, page);
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: pager });
        this.props.onChangePage(pageOfItems);
    }
    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 8;
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 8) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 8;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var pages = [...Array(endPage + 1 - startPage).keys()].map(
            i => startPage + i
        );
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }
        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? "page-item disabled" : "page-item"}></li>
                <span className="page-link" onClick={() => this.setPage(1)}>First</span>
                <li
                    className={pager.currentPage === 1 ? "page-item disabled" : "page-item"}
                ><span className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</span></li>
                {pager.pages.map((page, index) => (
                    <li
                        key={index}
                        className={pager.currentPage === page ? "page-item active" : "page-item"}>
                        <span className="page-link" onClick={() => this.setPage(page)}>{page}</span>
                    </li>
                ))}
                <li
                    className={pager.currentPage === pager.totalPages ? "page-item disabled" : "page-item"
                    }><span className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>Next</span>
                </li>
                <li
                    className={
                        pager.currentPage === pager.totalPages ? "page-item disabled" : "page-item"
                    }><span className="page-link" onClick={() => this.setPage(pager.totalPages)}>Last</span>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;