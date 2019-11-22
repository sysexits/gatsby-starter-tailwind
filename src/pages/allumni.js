import React from 'react'
import Layout from '../components/layout'
import {graphql,useStaticQuery,Link} from 'gatsby'
import Img from 'gatsby-image'
const AllumniPage = () =>{
    const data = useStaticQuery(graphql`
    query{
        allMembersJson(filter: {graduate: {eq: true}}) {
            edges {
            node {
                id
                path {
                    childImageSharp {
                        fluid(maxWidth: 200, quality:100)
                        {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                interest
                bio
                name
                status
                affiliation
                email
                graduate
                affiliation
                sitePrefix
                enterdate
                graduatedate
            }
            }
        }
    }
    `)
    const {edges} = data.allMembersJson
    var phdNode = [];
    var msNode = [];
    var undergradNode = [];
    edges.map(({node}) => {
        if(node.status === "phd")
        {
            phdNode.push(node);
        }
        if(node.status === "msc")
        {
            msNode.push(node);
        }
        if(node.status === "undergrad")
        {
            undergradNode.push(node);
        }
    })

    // Function for create each section
    function createSection(sectionName, id, nodes)
    {
        return (
            <div id={id}>
                {id == "phd" && <h3 className="bg-blue-700 w-full text-white text-xl font-bold inline-block p-4 mb-4">{sectionName}</h3>}
                {id == "msc" && <h3 className="bg-yellow-400 w-full text-black text-xl font-bold inline-block p-4 mb-4">{sectionName}</h3>}
                {id == "undergrad" && <h3 className="bg-red-200 w-full text-black text-xl font-bold inline-block p-4 mb-4">{sectionName}</h3>}
                <div class="flex flex-wrap -mx-2">
                        {nodes.map((node,index) => {
                            return (
                                <div class="w-full px-2 mb-4 my-auto">
                                    <div class="flex items-center justify-center">
                                        <div class="w-full md:w-1/2 lg:w-1/2 px-2 mb-4 text-center">
                                            <Img fluid={node.path.childImageSharp.fluid} className="mx-auto w-16 h-16 md:w-32 md:h-32 rounded-full" objectFit="cover" objectPosition="50% 50%"></Img>
                                        </div>
                                        <div class="w-full md:w-1/2 lg:w-1/2 px-2 mb-4">
                                            <h1 className="text-xl font-bold pt-0 lg:pt-0">{node.name}</h1>
                                            <h1 className="text-lg font-semibold pt-0 lg:pt-0">{node.affiliation}</h1>
                                            {node.graduatedate !== "" && id === "phd" && <h1 className="text-normal font-semibold pt-0 lg:pt-0">Ph.D. ({node.graduatedate})</h1>}
                                            {node.graduatedate !== "" && id === "msc" && <h1 className="text-normal font-semibold pt-0 lg:pt-0">M.S. ({node.graduatedate})</h1>}
                                            {node.graduatedate !== "" && id === "undergrad" && <h1 className="text-normal font-semibold pt-0 lg:pt-0">B.S. ({node.graduatedate})</h1>}
                                            {node.bio !== "" && <h1 className="text-normal font-semibold pt-0 lg:pt-0">{node.bio}</h1>}
                                            {node.enterdate !== "" && <h1 className="text-sm font-medium pt-0 lg:pt-0">Joining date: {node.enterdate}</h1>}
                                            <h1 className="text-sm font-medium pt-0 lg:pt-0">{node.email}</h1>
                                            {node.sitePrefix !== "" && <h1 className="text-sm font-normal pt-0 lg:pt-0"><a href={node.sitePrefix} className="font-medium no-underline hover:underline text-black text-normal">Link</a></h1>}
                                            <div class="w-full mt-4">
                                                {node.interest.map((tag,index) => {
                                                            return (
                                                                <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-medium text-gray-800 mb-2 mr-2">{tag}</span>
                                                            )}
                                                )}
                                                </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            )}
                        )}
                </div>
            </div>
        )
    }
    // console.log(edges)
    return(
        <Layout>
        <div className="w-full">
            {createSection("Ph.D. Alumni", "phd", phdNode)}
            {createSection("Master's Alumni", "msc", msNode)}
            {createSection("Undergraduate Alumni", "undergrad", undergradNode)}
        </div>
        </Layout>
    )
}
export default AllumniPage