import React from 'react'
import Layout from '../components/layout'
import {graphql,useStaticQuery,Link} from 'gatsby'
import Img from 'gatsby-image'
const InternPage = () =>{
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
    var internNode = [];
    edges.map(({node}) => {
        if(node.status === "interns")
        {
            internNode.push(node);
        }
    })

    // Function for create each section
    function createSection(sectionName, id, nodes)
    {
        return (
            <div id={id}>
                {id == "intern" && <h3 className="bg-yellow-400 w-full text-black text-xl font-bold inline-block p-4 mb-4">{sectionName}</h3>}
                <div className="flex flex-wrap -mx-2">
                        {nodes.map((node,index) => {
                            return (
                                <div key={index} className="w-full px-2 mb-4 my-auto">
                                    <div className="flex flex-wrap items-center justify-center">
                                        <div className="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4 text-center">
                                        <Img fluid={node.path.childImageSharp.fluid} className="mx-auto w-32 h-32 md:w-48 md:h-48 rounded-full" objectFit="cover" objectPosition="50% 50%"></Img>
                                        </div>
                                        <div className="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                                            <h1 className="text-xl font-bold pt-0 lg:pt-0">{node.name}</h1>
                                            <h1 className="text-lg font-semibold pt-0 lg:pt-0">{node.affiliation}</h1>
                                            <h1 className="text-lg font-semibold pt-0 lg:pt-0">{node.bio}</h1>
                                            <h1 className="text-sm font-medium pt-0 lg:pt-0">{node.enterdate} ~ {node.graduatedate}</h1>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            )}
                        )}
                </div>
            </div>
        )
    }
    return(
        <Layout>
        <div className="w-full">
            {createSection("Interns & Visiting Students", "intern", internNode)}
        </div>
        </Layout>
    )
}
export default InternPage