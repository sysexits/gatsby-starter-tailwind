import React from 'react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, InfiniteHits, SearchBox, Highlight  } from 'react-instantsearch/dom';
import Layout from "../components/layout";
import "../css/search.css"

const Hit = ({ hit }) =>  (

<div className="w-full">
    
    <div className="border-2 border-grey-400 hover:border-blue-500">
        <div className="m-2">
            {hit.type === "International Journal" && <h3 className="bg-red-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{hit.type}</h3>}
            {hit.type === "International Conference" && <h3 className="bg-blue-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{hit.type}</h3>}
            {hit.type === "Domestic Journal" && <h3 className="bg-green-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{hit.type}</h3>}
            {hit.type === "Domestic Conference" && <h3 className="bg-purple-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{hit.type}</h3>}
            
            <div className="text-gray-900 font-semibold text-lg mb-1">{hit.title}</div>
            {hit.subtitle !== "" && <div className="text-gray-700 font-semibold text-sm mb-1">{hit.subtitle}</div>}
            <p className="text-gray-700 font-medium text-sm">{hit.date}</p>
            <div className="w-full sm:w-auto py-2">
                {hit.author.map((tag,index) => {
                    return (
                        <span key={index} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-medium text-gray-800 mr-2">{tag}</span>
                    )}
                )}
            </div>
            
            {hit.doi !== "" && <div className="inline-flex">
                <a href={hit.doi} className="no-underline hover:underline"><span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-gray-800 mr-2">Available here</span></a>
            </div>}
        </div>
    </div>                        
</div>
)

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_ADMIN_KEY
  );  

export default function Search({location}) {
    return (
        <Layout>
            <InstantSearch
                indexName="cgv_homepage"
                searchClient={searchClient}
            ><Configure
                    hitsPerPage={4}
                    distinct
                />
                <SearchBox className="search-bar" submit={<svg className="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>} searchAsYouType={true} showLoadingIndicator={true}  />

                <h3 className="bg-blue-800 text-white text-xl font-bold inline-block mt-4 mb-4 p-3">Search Results</h3>
                <InfiniteHits hitComponent={Hit} />
            </InstantSearch>
        </Layout>
    )
}
