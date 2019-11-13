import React from 'react'
import {graphql} from 'gatsby'
import Layout from "../components/layout";

export const query = graphql`
        query(
            $slug: String
        ){
        markdownRemark (
            fields:{ slug:{ eq: $slug } }
        ){
            frontmatter {
                title,
                date
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
    const { title,date } = frontmatter
    const {slug} = fields
    const gitlink ="https://github.com/aman29271/gatsby-bootcamp-project/blob/master/content/posts/"
    return(
        <Layout>
            <div class="flex mb-4">
                <div class="w-full">
                    <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
                    {title}
                    </h2>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html:html}}></div>
        </Layout>
    )
}
export default Member
