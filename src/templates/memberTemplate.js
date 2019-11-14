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
    const { title,date,image, tags } = frontmatter
    const {slug} = fields
    return(
        <Layout>
            <div class="bg-white shadow p-3 rounded lg:w-64">
                <div className = "w-full">
                    <Img
                        fluid={image.childImageSharp.fluid}
                        alt="A corgi smiling happily"
                    />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                </div>
                <div className="px-6 py-4">
                    {tags.map((tag,index) => {
                        return (
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{tag}</span>
                        )}
                    )}
                </div>
            </div>
            
        </Layout>
    )
}
export default Member
