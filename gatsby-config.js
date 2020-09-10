// Init Env Variables
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Alternative Education India',
    description:
      'Alternative Education Resource For Parents, Students & Teachers, Includes A Comphrehensive List Of Alternative Schools in India',
    keywords:
      'Alternative Education, Home Schooling, How to Home School, Alternative Learning, Homeschooling Parents, Alternative Schools, Indian Education System, Unschooling, Problems with education,Factory Schooling, education in india, education portal',
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-anywhere`,
            options: {
              sharpMethod: `fluid`,
              maxWidth: 500,
              showCaptions: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: [{ regex: '^/blog/.+' }],
        excludePaths: [],
        height: 3,
        prependToBody: false,
        color: `#5fcf80`,
        footerHeight: 200,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#5fcf80`,
        minimum: 0.8,
        trickleSpeed: 100,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alternative Education India`,
        short_name: `Alternative Education`,
        start_url: `/`,
        background_color: `#d4fcee`,
        theme_color: `#5fcf80`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: `appib8lgH9b52GbJY`,
            tableName: `learning-spaces`,
            mapping: { image: `fileNode` },
            queryName: `LearningSpaces`,
            separateNodeType: true,
            tableLinks: [`articles`],
          },
          {
            baseId: `appib8lgH9b52GbJY`,
            tableName: `articles`,
            tableLinks: [`learning-spaces`],
          },
          {
            baseId: `apphxKZZ6d8pCyun9`,
            tableName: `events`,
            mapping: { banner: `fileNode` },
            queryName: `Events`,
            separateNodeType: true,
          },
          {
            baseId: `app6FQ6E0mV2cJZcD`,
            tableName: `blog`,
            mapping: { banner: `fileNode`, content: `text/markdown` },
            queryName: `Blog`,
            separateNodeType: true,
          },
          {
            baseId: `appkwOkUgf23GAZY6`,
            tableName: `books`,
            mapping: { cover: `fileNode` },
            queryName: `Books`,
            separateNodeType: true,
          },
          {
            baseId: `appqDgxwJMIqnpxej`,
            tableName: `websites`,
            queryName: `Websites`,
            separateNodeType: true,
          },
          {
            baseId: `appQUEfCOXkKANMuw`,
            tableName: `careers`,
            queryName: `Careers`,
            mapping: { description: `text/markdown` },
            separateNodeType: true,
          },
          {
            baseId: `appUQbpBCRYS8lyL4`,
            tableName: `local-communities`,
            queryName: `LocalCommunities`,
            separateNodeType: true,
          },
        ],
      },
    },
  ],
};
