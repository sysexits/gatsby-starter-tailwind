import React from 'react'
import {graphql, StaticQuery, Link} from 'gatsby'
import Layout from "../components/layout";

export const query = graphql`
    query( $year: Int!, $year_next: Int! )
    {
        allNewsJson(filter: {fields: {timestamp: {gt: $year, lt: $year_next}}}
            sort: {fields: fields___timestamp, order: DESC}) {
        edges {
            node {
                id
                date(formatString:"MMMM DD, YYYY")
                to(formatString:"MMMM DD")
                content
                type
            }
        }
        }
    }
`

const News=(props)=>{
    function fromToString(from, to)
    {
        var tokens = from.split(",")
        var mmdd = tokens[0];
        var mmddTokens = mmdd.split(" ");
        var mm = mmddTokens[0];
        var dd = mmddTokens[1];

        var mmddTokensTo = to.split(" ")
        var toDD = mmddTokensTo[1]
        if (dd.charAt(0) === '0') dd = dd.replace("0", "");
        if (toDD.charAt(0) === '0') toDD = toDD.replace("0", "");
        if(mm === mmddTokensTo[0]) return mm + " " + dd + " ~ " + toDD + ", " + tokens[1]
        else {return mm + " " + dd + " ~ " + mmddTokensTo[0] + " " + toDD + ", " + tokens[1]}
    }

    const entities = props.data.allNewsJson.edges
    var newsMenu = []
    const isFirst = props.pathContext.year_int === 2002
    const isLast = props.pathContext.year_int === 2019
    const defaultPath = "/news/"
    const prevPage = (props.pathContext.year_int - 1).toString()
    const nextPage = props.pathContext.year_int + 1 === 2019 ? "/" : (props.pathContext.year_int + 1).toString()

    var yearIter = props.pathContext.year_int + 3
    var count = 0
    while(count < 5)
    {
        if(yearIter >= 2002 && yearIter < 2020)
        {
            newsMenu.push(yearIter)
            count = count + 1
        }
            
        yearIter = yearIter - 1;
        if(yearIter < 2002)
            break
    }
    newsMenu.reverse()

    return(
        <Layout>
            <h3 className="bg-blue-800 text-white text-xl font-bold inline-block mb-4 p-3">News in {props.pathContext.year_string}</h3>
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
                {Array.from({ length: newsMenu.length }, (_, i) => (
                    <Link className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" key={`pagination-number${newsMenu[i]}`} to={defaultPath + `/${newsMenu[i] === 0 ? "" : newsMenu[i]}`}>
                    {newsMenu[i]}
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
            <div className="w-full">
                {entities.map(({node})=> {
                    return (
                        <div key={node.id} className="w-full">
                            <div className="md:flex border-2 border-grey-400 hover:border-blue-500 px-5 py-2 my-1 rounded-lg">
                            <div className="mt-4 md:mt-0 md:ml-6">
                                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">{node.type}</div>
                                <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
                                <span>{node.to !== "Invalid date" && fromToString(node.date, node.to)}</span>
                                <span>{node.to === "Invalid date" && node.date}</span>
                                </div>
                                <p className="mt-2 text-gray-600 font-medium">{node.content}</p>
                            </div>
                            </div>
                        </div>
                    )

                })}
            </div>
        </Layout>
    )
}
export default News
