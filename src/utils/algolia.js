const papersQuery = `{
    allPapersJson {
        edges {
            node {
                id
                title
                subtitle
                type
                author
                date
                doi
                abstract
                keywords
            }
        }
    }
}
`

const papersTransform = ({data}) => {
    return data.allPapersJson.edges.map(({node}) => node);
}

const queries = [
    {
        query: papersQuery,
        transformer: papersTransform
    }
]

module.exports = queries