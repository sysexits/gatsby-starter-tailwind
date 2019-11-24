import React from 'react'
import Layout from '../components/layout'
import {graphql,useStaticQuery,Link} from 'gatsby'
import Img from 'gatsby-image'

const ResearchPage = () =>{
    const data = useStaticQuery(graphql`
    query{
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
            edges {
              node {
                frontmatter {
                  date
                  thumbnail {
                        childImageSharp {
                            fixed (height:150, width:150, quality:100)
                            {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                  title
                  tag
                  path
                }
              }
            }
          }
    }
    `)
    const {edges} = data.allMarkdownRemark
    var medicalNode = [];
    var hapticNode = [];
    var interactionNode = [];
    var visNode = [];

    edges.map(({node}) => {
        if(node.frontmatter.tag === "medical")
        {
            medicalNode.push(node);
        }
        if(node.frontmatter.tag === "haptics")
        {
            hapticNode.push(node);
        }
        if(node.frontmatter.tag === "interaction")
        {
            interactionNode.push(node);
        }
        if(node.frontmatter.tag === "vis")
        {
            visNode.push(node);
        }
    })

    // Function for create each section
    function createSection(sectionName, id, nodes)
    {
        return (
            <div id={id} className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-2 lg:-mx-2 xl:-mx-2">
            <h3 className="bg-yellow-400 w-full text-black text-xl font-bold inline-block p-4">{sectionName}</h3>
                {nodes.map((node,index) => {
                return (
                    <div key={index} className="my-1 px-1 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-full md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
                        <div className = "flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-2 lg:-mx-2 xl:-mx-2">
                            <div className="my-2 px-2 w-1/2 overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2 text-center">
                            <Img fixed={node.frontmatter.thumbnail.childImageSharp.fixed} className="mx-auto object-cover"></Img>
                            </div>
                            <div className="my-2 px-2 w-1/2 overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
                            <div className="m-auto"> <a href={node.frontmatter.path} className="font-medium no-underline hover:underline text-black text-normal">{node.frontmatter.title}</a> </div>
                            </div>
                        </div>
                        
                    </div>
                    )}
                )}
            </div>
        )
    }

    return(
        <Layout>
            <div className="w-full">
                {createSection("Medical Image Analysis and Modeling", "medical", medicalNode)}
                {createSection("Computer Haptics and VR", "haptics", hapticNode)}
                {createSection("3D Interaction", "interaction", interactionNode)}
                {createSection("Data Visualization", "vis", visNode)}
            </div>
        </Layout>
    )
}
export default ResearchPage