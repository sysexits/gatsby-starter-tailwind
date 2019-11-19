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
    query {
        allMembersJson(filter: {graduate: {eq: false}}) {
            edges {
            node {
                id
                img
                interest
                bio
                name
                status
                graduate
                affiliation
                sitePrefix
            }
            }
        }
    }
    `)
    const memberPosts = memberRes.data.allMembersJson.edges
    memberPosts.forEach((post)=>{
        createPage({
            component: memberTemplate,
            path:`/members/${post.node.sitePrefix}`,
            context:{
                name: `${post.node.sitePrefix}`
            }
        })
    })
    
    const publicationTempate = path.resolve(`src/templates/publicationTemplate.js`)
    const paperRes = await graphql(`
        query {
            allPapersJson(sort: {fields: date, order: DESC})
            {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    `)
    const entities = paperRes.data.allPapersJson.edges
    const visibleEntities = 5
    const entitiesPerPage = 10
    const numPaperPages = Math.ceil(entities.length / entitiesPerPage)
    Array.from({length: numPaperPages}).forEach((_, i) => {
        createPage({
            path: i == 0 ? `/publication` : `/publication/${i + 1}`,
            component: publicationTempate,
            context: {
                limit: entitiesPerPage,
                skip: i * entitiesPerPage,
                numPaperPages,
                visibleEntities,
                currentPage: i + 1
            },
        })
    })

    const iJournalRes = await graphql(`
        query {
            allPapersJson(filter: {type: {eq: "International Journal"}}, sort: {fields: date, order: DESC})
            {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    `)
    const publicationByTagTempate = path.resolve(`src/templates/publicationByTagTemplate.js`)
    const iJournals = iJournalRes.data.allPapersJson.edges
    const numJournalPages = Math.ceil(iJournals.length / entitiesPerPage)
    Array.from({length: numJournalPages}).forEach((_, i) => {
        createPage({
            path: i == 0 ? `/publication/tags/journal` : `/publication/tags/journal/${i + 1}`,
            component: publicationByTagTempate,
            context: {
                limit: entitiesPerPage,
                skip: i * entitiesPerPage,
                numTotalPages: numJournalPages,
                visibleEntities,
                currentPage: i + 1,
                currentTag: 'International Journal',
                currentPath: "journal"
            },
        })
    })
}