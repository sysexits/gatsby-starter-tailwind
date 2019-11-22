import React from 'react'
import {graphql, StaticQuery, Link} from 'gatsby'
import Layout from "../components/layout";
import Img from 'gatsby-image'

export const query = graphql`
    query( $year: Int!, $year_next: Int! )
    {
        allPhotosJson (
            filter: {fields: {timestamp: {gt: $year, lt: $year_next}}}
            sort: {fields: fields___timestamp, order: DESC}
        ) 
        {
            edges {
                node { 
                    path {
                        childImageSharp {
                            fixed (height:200, width:200, quality:100)
                            {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
            }
        }
    }
`
const Photos=(props)=>{
    const entities = props.data.allPhotosJson.edges
    /*
    
    var photosMenu = []
    const isFirst = props.pathContext.year_int === 2002
    const isLast = props.pathContext.year_int === 2019
    const defaultPath = "/photos/"
    const prevPage = (props.pathContext.year_int - 1).toString()
    const nextPage = props.pathContext.year_int + 1 === 2019 ? "/" : (props.pathContext.year_int + 1).toString()

    var yearIter = props.pathContext.year_int + 3
    var count = 0
    while(count < 5)
    {
        if(yearIter >= 2002 && yearIter < 2020)
        {
            photosMenu.push(yearIter)
            count = count + 1
        }
            
        yearIter = yearIter - 1;
        if(yearIter < 2002)
            break
    }
    photosMenu.reverse()
    */
    return(
        <Layout>
            <h3 className="bg-blue-800 text-white text-xl font-bold inline-block mb-4 p-3">Photos in {props.pathContext.year_string}</h3>
            
            <div className="w-full">
                <div class="flex flex-wrap -mx-2">
                    {entities.map(({node}) => {
                            return (
                                <div className="max-w-4xl flex items-center flex-wrap mx-auto lg:my-0">
                                    <div className="w-full lg:w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none bg-white mx-6 my-2 lg:mx-0">
                                        <div className="text-center lg:text-left">
                                            <div className="flex items-center justify-center lg:justify-start">
                                                <Img
                                                    fixed={node.path.childImageSharp.fixed} className="max-w-1/2">
                                                </Img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    )}
                </div>
            </div>
        </Layout>
    )
}
export default Photos
