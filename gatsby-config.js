const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Computer Graphics and Visualization Lab`,
    description: `Computer Graphics and Visualization Lab., School of Computing, KAIST / 카이스트 전산학부 컴퓨터 그래픽스 및 가시화 연구실 (박진아 교수)`,
    author: `Computer Graphics and Visualization Lab`
  },
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4dc0b5`,
        display: `minimal-ui`,
        icon: `src/images/tailwind-icon.png`
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/style.css`]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve:`gatsby-transformer-remark`,
      options:{
        plugins:[
          'gatsby-remark-prismjs',"gatsby-remark-copy-linked-files",
          {
            resolve:`gatsby-remark-images`,
            options:{
              maxWidth: 750,
              linkImagesToOriginal: true,
              showCaptions: true,
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
  ]
};
