import React from 'react'
import Layout from '../components/layout'
import {graphql,useStaticQuery,Link} from 'gatsby'
import Img from 'gatsby-image'
const MemberPage = () =>{
    const data = useStaticQuery(graphql`
    query{
        allMembersJson(filter: {graduate: {eq: false}}) {
            edges {
            node {
                id
                path {
                    childImageSharp {
                        fluid(maxWidth: 150, quality:100)
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
            }
            }
        }
    }
    `)
    const {edges} = data.allMembersJson
    var professorNode = [];
    var phdNode = [];
    var msNode = [];
    edges.map(({node}) => {
        if(node.status === "professor")
        {
            professorNode.push(node);
        }
        if(node.status === "phd")
        {
            phdNode.push(node);
        }
        if(node.status === "ms")
        {
            msNode.push(node);
        }
    })

    // Function for create each section
    function createSection(sectionName, id, nodes, status)
    {
        return (
            <div key={id} id={id}>
                {id == "professor" && <h3 className="bg-green-700 w-full text-white text-xl font-bold inline-block p-4 mb-4">{sectionName}</h3>}
                {id == "phd" && <h3 className="bg-blue-700 w-full text-white text-xl font-bold inline-block p-4 mb-4">{sectionName}</h3>}
                {id == "msc" && <h3 className="bg-yellow-400 w-full text-black text-xl font-bold inline-block p-4 mb-4">{sectionName}</h3>}
                <div className="flex flex-wrap -mx-2">
                        {nodes.map((node,index) => {
                            return (
                                <div key={index} className="w-full md:w-1/2 lg:w-1/2 px-2 my-auto">
                                    <div className="flex items-center justify-center">
                                        <div className="w-full md:w-1/2 lg:w-1/2 px-2 m-4 text-center">
                                        <Img fluid={node.path.childImageSharp.fluid} className="mx-auto w-32 h-32 md:w-32 md:h-32 rounded-full" objectFit="cover" objectPosition="50% 50%"></Img>
                                        </div>
                                        <div className="w-full md:w-1/2 lg:w-1/2 px-2 m-4 ">
                                            <h1 className="text-xl font-bold mb-2"><a href={'/members/' + node.sitePrefix} className="font-bold underline hover:text-gray-600 text-black text-normal">  {node.name} </a></h1>
                                            <h1 className="text-normal font-semibold mb-1">{status}</h1>
                                            <h1 className="text-sm font-medium mb-1">{node.email}</h1>
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
            {createSection("Professor", "professor", professorNode, "Professor")}
            {createSection("Ph.D Students", "phd", phdNode, "Ph.D Candidate")}
            {createSection("M.S. Students", "msc", msNode, "Master Student")}
        </div>
        </Layout>
    )
}
export default MemberPage