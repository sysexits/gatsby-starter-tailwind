import React from 'react'
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { Router } from "@reach/router"
import Layout from "../components/layout";
import SearchComponent from "../components/searchComponent"
import "../css/search.css"

export default function Search({location}) {
    return (
        <Layout>
            <Router>
                <SearchComponent path="/search" />
            </Router>,
        </Layout>
    )
}
