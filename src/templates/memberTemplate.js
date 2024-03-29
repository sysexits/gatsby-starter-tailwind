import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from "../components/layout";
import Img from 'gatsby-image'

export const query = graphql`
    query( $name: String )
    {
        allMembersJson(filter: {sitePrefix: {eq: $name}}) {
        edges {
            node {
                id
                path {
                    childImageSharp {
                        fixed (height:300, width:300, quality:100)
                        {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                interest
                bio
                name
                status
                graduate
                affiliation
                sitePrefix
                email
                office
                tel
            }
        }
        }
    }
`

const Member=(props)=>{
    const entities = props.data.allMembersJson.edges 
    
    return(
        <Layout>
            {entities.map(({node}) => {
                return(
                    <div key={node.id}>
                        <div className="max-w-4xl flex items-center flex-wrap mx-auto lg:my-0">
                            <div className="w-full lg:w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none bg-white mx-6 lg:mx-0">
                                <div className="text-center lg:text-left">
                                    <div className="flex items-center justify-center lg:justify-start">
                                    <Img fixed={node.path.childImageSharp.fixed} className="mx-auto md:mx-0 w-16 h-16 md:w-32 md:h-32 rounded-full object-cover"></Img>
                                    </div>
                                    <h1 className="text-3xl font-bold pt-8 lg:pt-0">{node.name}</h1>
                                    <div className="mx-auto lg:mx-0 w-full pt-3 border-b-2 border-blue-800"></div>
                                    {node.status === "professor" &&
                                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">Professor</p>
                                    }
                                    {node.status === "phd" &&
                                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">Ph.D Candidate</p>
                                    }
                                    {node.status === "ms" &&
                                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">Master Program</p>
                                    }
                                    {node.office !== "" &&
                                        <p className="pt-2 text-xs lg:text-sm flex items-center justify-center lg:justify-start">{node.office}</p>
                                    }
                                    {node.email !== "" &&
                                        <p className="pt-2 text-xs lg:text-sm flex items-center justify-center lg:justify-start">{node.email}</p>
                                    }
                                    {node.tel !== "" &&
                                        <p className="pt-2 text-xs lg:text-sm flex items-center justify-center lg:justify-start">{node.tel}</p>
                                    }
                                    {node.bio !== "" &&
                                        <div className="mt-4 w-full text-left">
                                            <h3 className="bg-blue-800 w-full text-white text-lg font-semibold inline-block p-3">Profile</h3>
                                            <p className="mt-4 mb-4 font-medium">{node.bio}</p>
                                        </div>
                                    }
                                    
                                    <div className="mt-4 w-full text-left">
                                        <h3 className="bg-blue-800 w-full text-white text-lg font-semibold inline-block p-3 mb-4">Research Interests</h3>
                                        {node.interest.map((tag,index) => {
                                            return (
                                                <span key={index} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-medium text-gray-800 mb-2 mr-2">{tag}</span>
                                            )}
                                        )}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )
            })}
        </Layout>
    )
}
export default Member
