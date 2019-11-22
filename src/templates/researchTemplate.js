import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";
import "../css/research.css"
import Img from 'gatsby-image'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
    <div className="w-full">
      <div className="research">
      <Img fixed={frontmatter.thumbnail.childImageSharp.fixed} className="mx-auto w-16 h-16 md:w-32 md:h-32 rounded-full object-cover"></Img>
        <h1>{frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        thumbnail {
            childImageSharp {
                fixed (height:150, width:150, quality:100)
                {
                    ...GatsbyImageSharpFixed
                }
            }
        }
      }
    }
  }
`


