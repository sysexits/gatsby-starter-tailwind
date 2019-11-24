import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from "../components/layout";

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
            labelVol
            vol
            labelNum
            num
            labelPP
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
            <h3 className="bg-blue-800 text-white text-xl font-bold inline-block mb-4 p-3">Publications by Category</h3>
            
            <div className="w-full">
            <div className="inline-block relative w-64 mb-4">
                <select id="research-category" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onClick={()=>{
                    var selectBox = document.getElementById("research-category");
                    
                    if(selectBox.selectedIndex === 1)
                    {
                        window.location.href = "/publication/tags/international_journal"
                    }
                    if(selectBox.selectedIndex === 2)
                    {
                        window.location.href = "/publication/tags/international_conference"
                    }
                    if(selectBox.selectedIndex === 3)
                    {
                        window.location.href = "/publication/tags/domestic_journal"
                    }
                    if(selectBox.selectedIndex === 4)
                    {
                        window.location.href = "/publication/tags/domestic_conference"
                    }
                    if(selectBox.selectedIndex === 5)
                    {
                        window.location.href = "/publication/tags/patent"
                    }
                }}>
                    <option>Category</option>
                    <option>International Journal</option>
                    <option>International Conference</option>
                    <option>Domestic Journal</option>
                    <option>Domestic Conference</option>
                    <option>Patent</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>    
            <a href="/search">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-8">
                    Search Publication
                </button>
            </a>
            </div>     

            <div className="w-full">

                {entities.map(({node}) => {
                    return (
                        <div key={node.id} className="w-full">
                            <div className="border-2 border-grey-400 hover:border-blue-500">
                                <div className="m-2">
                                    {node.type === "International Journal" && <h3 className="bg-red-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{node.type}</h3>}
                                    {node.type === "International Conference" && <h3 className="bg-blue-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{node.type}</h3>}
                                    {node.type === "Domestic Journal" && <h3 className="bg-green-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{node.type}</h3>}
                                    {node.type === "Domestic Conference" && <h3 className="bg-purple-100 text-black text-lg font-semibold inline-block -mx-4 p-2">{node.type}</h3>}
                                    
                                    <div className="text-gray-900 font-semibold text-xl mb-1">{node.title}</div>
                                    {node.subtitle !== "" && <div className="text-gray-700 font-semibold text-sm mb-1">{node.subtitle}</div>}
                                    {node.pp !== "" && 
                                    <div className="text-gray-600 font-medium text-sm, mb-1">
                                        {node.vol !== "" && <span className="mr-2">{node.labelVol === "" ? "Vol." : node.labelVol} {node.vol},</span> }
                                        {node.num !== "" && <span className="mr-2">{node.labelNum === "" ? "No." : node.labelNum} {node.num},</span> }
                                        <span className="mr-2">{node.labelPP === "" ? "pp." : node.labelPP} {node.pp}</span>                                        
                                    </div>
                                    }
                                    <p className="text-gray-700 font-medium text-sm">{node.date}</p>
                                    <div className="w-full sm:w-auto py-2">
                                        {node.author.map((tag,index) => {
                                            return (
                                                <span key={index} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-medium text-gray-800 mr-2">{tag}</span>
                                            )}
                                        )}
                                    </div>
                                    
                                    {node.doi !== "" && <div className="inline-flex">
                                        <a href={node.doi} className="no-underline hover:underline"><span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-gray-800 mr-2">Available here</span></a>
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
                    <span className="rounded-r rounded-sm border border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline cursor-not-allowed">&raquo;</span>
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
