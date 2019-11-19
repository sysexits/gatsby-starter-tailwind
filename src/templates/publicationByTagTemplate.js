import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from "../components/layout";
import Img from 'gatsby-image'
import ReactModal from 'react-modal'
import { NoUndefinedVariables } from 'graphql/validation/rules/NoUndefinedVariables';

export const query = graphql`
    query( $skip: Int!, $limit: Int!, $currentTag: String  )
    {
        allPapersJson(
            filter: {type: {eq: $currentTag}}
            sort: {fields: date, order: DESC}
            limit: $limit
            skip: $skip
        ) {
        edges {
            node {
            id
            author
            children {
                id
            }
            date
            doi
            parent {
                id
            }
            title
            type
            subtitle
            vol
            num
            pp
            }
        }
        }
    }
`


const PublicationByTag=(props)=>{
    const entities = props.data.allPapersJson.edges 
    const currentPage = props.pathContext.currentPage
    const totalPages = props.pathContext.numTotalPages
    const currentPath = props.pathContext.currentPath
    const isFirst = currentPage === 1
    const isLast = currentPage === totalPages
    const defaultPath = "/publication/tags/" + currentPath + "/"
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    var pageList = []
    var i
    for(i = currentPage - 2; i < currentPage + 3; i++)
    {
        if(i >= 0 && i < totalPages)
        {
            pageList.push(i);
        }
    }
    
    return(
        <Layout>
            <h3 className="bg-blue-800 text-white text-lg font-bold inline-block mb-4 p-3">Publications</h3>
            
            <div className="w-full">
                {entities.map(({node}) => {
                    return (
                        <div className="w-full">
                            <div className="border-2 border-grey-400 hover:border-blue-500 my-1">
                                <div className="m-2">
                                    {node.type === "International Journal" && <h3 className="bg-red-100 text-lg font-bold inline-block py-3">{node.type}</h3>}
                                    {node.type === "International Conference" && <h3 className="bg-blue-100 text-lg font-bold inline-block py-3">{node.type}</h3>}
                                    {node.type === "Domestic Journal" && <h3 className="bg-green-100 text-lg font-bold inline-block py-3">{node.type}</h3>}
                                    {node.type === "Domestic Conference" && <h3 className="bg-purple-100 text-lg font-bold inline-block py-3">{node.type}</h3>}
                                    <div className="text-gray-900 font-bold text-xl mb-2">{node.title}</div>
                                    {node.subtitle !== "" && <div className="text-gray-700 font-semibold text-lg mb-2">{node.subtitle}</div>}
                                    {node.pp !== "" && 
                                    <div className="text-gray-600 font-semibold text-sm, mb-2">
                                        {node.vol !== "" && <span className="mr-2">Vol. {node.vol},</span> }
                                        {node.num !== "" && <span className="mr-2">No. {node.num},</span> }
                                        <span className="mr-2">pp. {node.pp}</span>                                        
                                    </div>
                                    }
                                    <p className="text-gray-700 text-base">{node.date}</p>
                                    <div className="w-full sm:w-auto py-2">
                                        {node.author.map((tag,index) => {
                                            return (
                                                <span className="inline-block bg-blue-200 rounded-full my-1 px-3 py-1 text-sm font-semibold text-gray-800 mr-2">{tag}</span>
                                            )}
                                        )}
                                    </div>
                                    
                                    {node.doi !== "" && <div className="inline-flex">
                                        <button class="bg-white-800 hover:bg-gray-400 text-gray-800 font-semibold px-3 py-1">
                                            <a href={node.doi} class="no-underline hover:underline">Paper Link</a>
                                        </button>
                                    </div>}
                                    
                                    
                                </div>
                            </div>                        
                        </div>)})}
            </div>

            <div className="flex justify-center text-center items-center">
                {isFirst && (
                    <span className="rounded-l rounded-sm border border-brand-light px-3 py-2 cursor-not-allowed no-underline">&laquo;</span>
                )
                }
                {
                    !isFirst && (
                        <Link className="rounded-l rounded-sm border-t border-b border-l border-brand-light px-3 py-2 text-brand-dark hover:bg-brand-light no-underline"
                        to={defaultPath + prevPage} rel="prev">
                            &laquo;
                        </Link>
                    )
                }
                {Array.from({ length: pageList.length }, (_, i) => (
                    <Link className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" key={`pagination-number${pageList[i] + 1}`} to={defaultPath + `/${pageList[i] === 0 ? "" : pageList[i] + 1}`}>
                    {pageList[i] + 1}
                    </Link>
                    
                ))}
                {isLast && (
                    <span class="rounded-r rounded-sm border border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline cursor-not-allowed">&raquo;</span>
                )}
                {
                    !isLast && (
                        <Link className="rounded-r rounded-sm border border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" to={defaultPath + nextPage} rel="next">
                            &raquo;
                        </Link>
                    )
                }
            </div>
        </Layout>
    )
}
export default PublicationByTag
