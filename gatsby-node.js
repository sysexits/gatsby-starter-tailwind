const path = require('path')
const _ = require('lodash')
const moment = require('moment');


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

    if(node.internal.type === 'NewsJson') {
        const data = node.date
        createNodeField({
            name: 'timestamp',
            node,
            value: +moment(data).format('X'),
        })
    }

    if(node.internal.type === 'PhotosJson') {
        const data = node.date
        createNodeField({
            name: 'timestamp',
            node,
            value: +moment(data).format('X'),
        })
    }
}

module.exports.createPages = async ({graphql,actions}) => {
    const { createPage } = actions
    const newsTemplate = path.resolve(`src/templates/newsTemplate.js`)
    var yearIter
    for(yearIter = 2002; yearIter < 2020; yearIter++)
    {
        const yearString = yearIter.toString() + "-01-01"
        const nextYearString = (yearIter + 1).toString() + "-01-01"
        createPage({
            component: newsTemplate,
            path: `/news/` + yearIter,
            context: {
                year: +moment(yearString).format('X'),
                year_next: +moment(nextYearString).format('X'),
                year_string: yearIter.toString(),
                year_int: yearIter
            }
        })
    }

    const photosTemplate = path.resolve(`src/templates/photosTemplate.js`)
    var yearIter
    for(yearIter = 2002; yearIter < 2020; yearIter++)
    {
        const yearString = yearIter.toString() + "-01-01"
        const nextYearString = (yearIter + 1).toString() + "-01-01"
        createPage({
            component: photosTemplate,
            path: `/photos/` + yearIter,
            context: {
                year: +moment(yearString).format('X'),
                year_next: +moment(nextYearString).format('X'),
                year_string: yearIter.toString(),
                year_int: yearIter
            }
        })
    }    

    // Create Member Pages
    const memberTemplate = path.resolve(`src/templates/memberTemplate.js`)
    const memberRes = await graphql(`
    query {
        allMembersJson(filter: {graduate: {eq: false}}) {
            edges {
            node {
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

    const researchTemplate = path.resolve(`src/templates/researchTemplate.js`)
    const researchPosts = await graphql(`
        query {
        allMarkdownRemark {
            edges {
            node {
                frontmatter {
                path
                }
            }
            }
        }
        }
    `)
    
    researchPosts.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
        path: node.frontmatter.path,
        component: researchTemplate,
        context: {}, // additional data can be passed via context
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
    const publicationByTagTempate = path.resolve(`src/templates/publicationByTagTemplate.js`)
    tags = ["International Journal", "International Conference", "Domestic Journal", "Domestic Conference"]
    paths = ["international_journal", "international_conference", "domestic_journal", "domestic_conference"]

    var i
    for(i = 0; i < tags.length; i++)
    {
        const publicationByTagTempate = path.resolve(`src/templates/publicationByTagTemplate.js`)
        const query = `
        query {
            allPapersJson(filter: {type: {eq: "` + tags[i] + `"}}, sort: {fields: date, order: DESC})
            {
                edges {
                    node {
                        id
                    }
                }
            }
        }
        `
        const res = await graphql(query)
        const entities = res.data.allPapersJson.edges
        const numPages = Math.ceil(entities.length / entitiesPerPage)
        Array.from({length: numPages}).forEach((_, j) => {
            createPage({
                    path: j == 0 ? `/publication/tags/` + paths[i] : `/publication/tags/` + paths[i] + `/${j + 1}`,
                    component: publicationByTagTempate,
                    context: {
                        limit: entitiesPerPage,
                        skip: i * entitiesPerPage,
                        numTotalPages: numPages,
                        visibleEntities,
                        currentPage: j + 1,
                        currentTag: tags[i],
                        currentPath: paths[i]
                    },
                })
            })
    }
}