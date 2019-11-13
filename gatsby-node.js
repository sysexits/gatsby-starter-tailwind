const path = require('path')
const _ = require('lodash')

module.exports.onCreateNode = ({node, actions}) => {
    const {createNodeField} = actions
    if(node.internal.type == 'MarkdownRemark'){
        const slug = path.basename(node.fileAbsolutePath,'.md')
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

module.exports.createPages = async ({graphql,actions}) => {
    const { createPage } = actions
    // Render member pages
    const memberTemplate = path.resolve(`src/templates/memberTemplate.js`)
    const memberRes = await graphql(`
        query{
            allMarkdownRemark(
                filter: { frontmatter: {category: {eq: "member"}} }
            ){
                edges{
                    node{
                        fields{
                            slug
                        }
                    }
                }
            }
        }
        `)
    const memberPosts = memberRes.data.allMarkdownRemark.edges
    memberPosts.forEach((post)=>{
        const {slug} = post.node.fields
        createPage({
            component: memberTemplate,
            path:`/members/${slug}`,
            context:{
                slug
            }
        })
    })
}