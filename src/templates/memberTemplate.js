import React from 'react'
import {graphql} from 'gatsby'
import Layout from "../components/layout";
import Img from 'gatsby-image'

export const query = graphql`
    query( $slug: String )
    {
        markdownRemark ( fields:{ slug:{ eq: $slug } } )
        {
            frontmatter {
                type,
                email,
                title,
                date,
                image {
                    childImageSharp {
                        fluid (maxWidth: 200, maxHeight: 200){
                            ...GatsbyImageSharpFluid
                        }
                    }
                },
                tags
            }
            html
            fields{
                slug
            }   
        }
    }
`


const Member=(props)=>{
    const { frontmatter, html,fields} = props.data.markdownRemark
    const { title, type, email, image, tags } = frontmatter
    const {slug} = fields
    return(
        <Layout>
            <div className="flex justify-between items-center container mx-auto px-4">
                <div className="w-full md:w-1/4 p-4 text-center">
                    <Img
                        className="shadow-2xl"
                        fluid={image.childImageSharp.fluid}
                        alt="A corgi smiling happily"
                    /></div>
                <div className="w-full justify-center md:w-3/4 p-4 text-center">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <div className="text-xl mb-2">{type}</div>
                    <div className="text-xl mb-2">{email}</div>
                    
                    <div className="px-6 py-4">
                        {tags.map((tag,index) => {
                            return (
                                <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2">{tag}</span>
                            )}
                        )}
                    </div>
                </div>
            </div>
            <div className="flex mb-4 flex-wrap">
                <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: html }}
                    />
            </div>
            
        </Layout>
    )
}
export default Member
